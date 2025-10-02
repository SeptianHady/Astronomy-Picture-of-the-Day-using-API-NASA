document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const dateInput = document.getElementById('dateInput').value;
    const apiKey = 'DEMO_KEY'; // API demo
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`;
    
    document.getElementById('apodDisplay').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            
            // Menampilkan data APOD
            document.getElementById('apodTitle').textContent = data.title;
            document.getElementById('apodExplanation').textContent = data.explanation;
            
            const mediaContainer = document.getElementById('apodMedia');
            mediaContainer.innerHTML = '';
            
            if (data.media_type === 'image') {
                const img = document.createElement('img');
                img.src = data.url;
                img.alt = data.title;
                mediaContainer.appendChild(img);
            } else if (data.media_type === 'video') {
                const iframe = document.createElement('iframe');
                iframe.src = data.url;
                iframe.title = data.title;
                mediaContainer.appendChild(iframe);
            }
            
            // Menampilkan elemen APOD
            document.getElementById('apodDisplay').classList.remove('hidden');
        })
        .catch(error => {
            document.getElementById('errorMessage').textContent = `Error: ${error.message}`;
            document.getElementById('errorMessage').classList.remove('hidden');
        });
});
