export default function get(url) : Promise<string>{
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = (e) => resolve(<string>e.target['response']);
        xhr.onerror = reject;
        xhr.send();
    })
}