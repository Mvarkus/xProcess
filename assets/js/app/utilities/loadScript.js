const loadScript = (name) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'assets/js/'+name;
        document.body.append(script);

        script.onload = () => resolve();
        script.onerror = () => reject();
    });
};