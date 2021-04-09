class NotificationManager {
    /**
     * Handles errors occurence
     * 
     * @param {Error} error instance 
     */
    static errorOccured(error) {
        this.notifyUser(error.message, 'error');
        throw error;
    }

    static notifyUser(message, type) {
        alert(message);
    }
}