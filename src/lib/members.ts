import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './fb';

export async function removeMember(
	workspaceId: string,
	memberId: string,
): Promise<void> {
	try {
		const workspace = doc(db, 'workspaces', workspaceId);
		const workspaceDoc = await getDoc(workspace);

		if (!workspaceDoc.exists()) {
			throw new Error('Workspace not found');
		}

		// Get current user
		const currentUser = auth.currentUser;
		if (!currentUser) {
			throw new Error('Not authenticated');
		}

		// Only workspace owner can remove members
		if (workspaceDoc.data().owner !== currentUser.uid) {
			throw new Error('Only workspace owner can remove members');
		}

		// Cannot remove yourself (the owner)
		if (memberId === currentUser.uid) {
			throw new Error('Cannot remove workspace owner');
		}

		// Remove member from the workspace
		await updateDoc(workspace, {
			members: arrayRemove(memberId),
		});
	} catch (error) {
		console.error('Error removing member:', error);
		throw error;
	}
}
