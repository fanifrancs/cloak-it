const copyMessageLinkButton = document.getElementById('copyMessageLinkBtn');
const copyMessageLinkFeedback = document.getElementById('copyMessageLinkFeedback');
const messageStack = document.getElementById('messageStack');

if (copyMessageLinkButton && copyMessageLinkFeedback) {
    copyMessageLinkButton.addEventListener('click', async function () {
        const username = (copyMessageLinkButton.dataset.username || 'operator').trim().toLowerCase();
        const shareLink = `${window.location.origin}/${username}/message`;

        try {
            await navigator.clipboard.writeText(shareLink);
            copyMessageLinkFeedback.textContent = 'Link copied to clipboard. Share it anywhere you like.';
        } catch (error) {
            copyMessageLinkFeedback.textContent = `Copy failed. Here is your link: ${shareLink}`;
        }
    });
}

function createEmptyState() {
    const emptyState = document.createElement('section');
    emptyState.className = 'glass-panel empty-state-panel';
    emptyState.setAttribute('data-empty-state', 'true');
    emptyState.innerHTML = `
        <h2 class="empty-state-title">No messages yet.</h2>
        <p class="empty-state-copy">
            Share your unique link and your anonymous messages will start showing up here.
        </p>
    `;
    return emptyState;
}

function setDeleteLoadingState(deleteLink, isLoading) {
    if (!deleteLink) {
        return;
    }

    if (!deleteLink.dataset.defaultLabel) {
        deleteLink.dataset.defaultLabel = deleteLink.textContent.trim();
    }

    if (isLoading) {
        deleteLink.dataset.loading = 'true';
        deleteLink.setAttribute('aria-disabled', 'true');
        deleteLink.innerHTML = `
            <span class="message-link-spinner" aria-hidden="true"></span>
            <span>Deleting...</span>
        `;
        return;
    }

    deleteLink.dataset.loading = 'false';
    deleteLink.removeAttribute('aria-disabled');
    deleteLink.textContent = deleteLink.dataset.defaultLabel || 'Delete';
}

if (messageStack) {
    messageStack.addEventListener('click', async function (event) {
        const shareLink = event.target.closest('[data-share-message]');

        if (shareLink) {
            event.preventDefault();
            window.alert('Feature under development.');
            return;
        }

        const deleteLink = event.target.closest('[data-delete-message]');

        if (!deleteLink) {
            return;
        }

        event.preventDefault();

        if (deleteLink.dataset.loading === 'true') {
            return;
        }

        const messageId = deleteLink.dataset.messageId;
        const messageCard = deleteLink.closest('[data-message-card]');

        if (!messageId || !messageCard) {
            return;
        }

        try {
            setDeleteLoadingState(deleteLink, true);

            const response = await fetch(`/dashboard/message/${messageId}/delete`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json().catch(function () {
                return { success: false, error: 'Invalid server response' };
            });

            if (!response.ok || !result.success) {
                setDeleteLoadingState(deleteLink, false);
                window.alert(result.error || 'Failed to delete message');
                return;
            }

            messageCard.remove();

            const remainingCards = messageStack.querySelectorAll('[data-message-card]');
            const existingEmptyState = messageStack.querySelector('[data-empty-state]');

            if (remainingCards.length === 0 && !existingEmptyState) {
                messageStack.appendChild(createEmptyState());
            }
        } catch (error) {
            setDeleteLoadingState(deleteLink, false);
            window.alert('Failed to delete message');
        }
    });
}
