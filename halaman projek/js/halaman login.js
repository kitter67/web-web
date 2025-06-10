document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video1');
    const audio = document.getElementById('audio1');

    // Ensure the video plays muted and loops
    video.muted = true;
    video.loop = true;
    video.play().catch(error => 
        console.error('Error playing video:', error)
    );

    // Ensure the audio plays and loops
    audio.loop = true;
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
        // Attempt to resume audio playback after user interaction
        document.body.addEventListener('click', () => {
            audio.play().catch(err => 
                console.error('Error resuming audio:', err)
            );
        }, { once: true });
    });
});
