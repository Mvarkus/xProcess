const loadScript = (name) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = name;
        script.async = false;
        script.defer = true;
        document.body.append(script);

        script.onload = () => resolve();
        script.onerror = () => reject();
    });
};