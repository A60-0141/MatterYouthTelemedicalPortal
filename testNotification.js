const axios = require('axios');

const triggerNotification = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/notification/trigger', {
            userId: 'exampleUserId',
            message: 'This is a test notification'
        }, {
            headers: {
                'x-auth-token': 'your-auth-token'
            }
        });
        console.log('Notification triggered:', res.data);
    } catch (error) {
        console.error('Error triggering notification', error.response ? error.response.data : error);
    }
};

triggerNotification();


