// Telegram Web JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.querySelector('.messages-container');
    const chatItems = document.querySelectorAll('.chat-item');
    
    // Handle Enter key for sending messages
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Handle chat selection
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            chatItems.forEach(chat => chat.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update chat header based on selected chat
            updateChatHeader(this);
            
            // Clear messages and load chat messages
            loadChatMessages(this);
        });
    });
    
    // Auto-scroll to bottom of messages
    scrollToBottom();
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText === '') return;
    
    // Create message element
    const messageElement = createMessageElement(messageText, 'outgoing');
    
    // Add to messages container
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.appendChild(messageElement);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    scrollToBottom();
    
    // Update last message in sidebar
    updateLastMessage(messageText);
    
    // Simulate response after a delay
    setTimeout(() => {
        simulateResponse();
    }, 1000 + Math.random() * 2000);
}

function createMessageElement(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
            <div class="message-time">${currentTime}</div>
        </div>
    `;
    
    return messageDiv;
}

function simulateResponse() {
    const responses = [
        "Thanks for your message!",
        "That's interesting!",
        "I'll get back to you on that.",
        "Great to hear from you!",
        "Let me think about that...",
        "Sounds good!",
        "I agree with you.",
        "Could you tell me more?",
        "That makes sense.",
        "I'm here if you need anything else."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const messageElement = createMessageElement(randomResponse, 'incoming');
    
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.appendChild(messageElement);
    
    scrollToBottom();
    updateLastMessage(randomResponse);
}

function updateChatHeader(chatItem) {
    const chatName = chatItem.querySelector('.chat-name').textContent;
    const avatar = chatItem.querySelector('.avatar').textContent;
    
    const chatTitle = document.querySelector('.chat-title');
    const headerAvatar = document.querySelector('.chat-header-info .avatar');
    
    chatTitle.textContent = chatName;
    headerAvatar.textContent = avatar;
}

function loadChatMessages(chatItem) {
    const messagesContainer = document.querySelector('.messages-container');
    const chatName = chatItem.querySelector('.chat-name').textContent;
    
    // Clear existing messages
    messagesContainer.innerHTML = '';
    
    // Load different messages based on chat
    let messages = [];
    
    switch(chatName) {
        case 'User Chat':
            messages = [
                { text: "Hello! Welcome to Telegram Web.", type: "incoming", time: "12:00" },
                { text: "Thanks! This looks great.", type: "outgoing", time: "12:01" },
                { text: "You can send messages, view chats, and more!", type: "incoming", time: "12:02" }
            ];
            break;
        case 'Group Chat':
            messages = [
                { text: "Hello everyone!", type: "incoming", time: "11:30" },
                { text: "Hey there! How's everyone doing?", type: "outgoing", time: "11:31" },
                { text: "Great! Thanks for asking.", type: "incoming", time: "11:32" }
            ];
            break;
        case 'Channel':
            messages = [
                { text: "📢 Latest updates from our channel", type: "incoming", time: "10:15" },
                { text: "🔔 Don't forget to subscribe for more updates!", type: "incoming", time: "10:16" }
            ];
            break;
    }
    
    // Add messages to container
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${msg.type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <div class="message-text">${escapeHtml(msg.text)}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `;
        messagesContainer.appendChild(messageElement);
    });
    
    scrollToBottom();
}

function updateLastMessage(text) {
    const activeChat = document.querySelector('.chat-item.active');
    if (activeChat) {
        const lastMessage = activeChat.querySelector('.last-message');
        const chatTime = activeChat.querySelector('.chat-time');
        
        lastMessage.textContent = text;
        
        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        chatTime.textContent = currentTime;
    }
}

function scrollToBottom() {
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const chatItems = document.querySelectorAll('.chat-item');
        
        chatItems.forEach(item => {
            const chatName = item.querySelector('.chat-name').textContent.toLowerCase();
            const lastMessage = item.querySelector('.last-message').textContent.toLowerCase();
            
            if (chatName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Mobile responsiveness
function toggleMobileView() {
    const sidebar = document.querySelector('.sidebar');
    const mainChat = document.querySelector('.main-chat');
    
    if (window.innerWidth <= 768) {
        // Mobile view logic can be added here
        // For now, we'll keep the current responsive CSS approach
    }
}

window.addEventListener('resize', toggleMobileView);
toggleMobileView(); // Call on load