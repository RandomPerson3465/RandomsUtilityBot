module.exports = function formatDuration(duration, includeMs = false) {
    
    let result;
    const days = Math.floor(duration / 8.64e7);
    const hours = Math.floor((duration % 8.64e7) / 3.6e6);
    const minutes = Math.floor((duration % 3.6e6) / 6e4);
    const seconds = Math.floor((duration % 6e4) / 1e3);
    const milliseconds = Math.floor((duration % 1e3));

    if (includeMs) {
        if (!duration || duration < 1) return '0 milliseconds';
        result =  `${days ? (days === 1 ? '1 day ' : days + ' days ') : ''}${hours ? (hours === 1 ? '1 hour ' : hours + ' hours ') : ''}${minutes ? (minutes === 1 ? '1 minute ' : minutes + ' minutes ') : ''}${seconds ? (seconds === 1 ? '1 second ' : seconds + ' seconds ') : ''}${milliseconds ? (milliseconds === 1 ? '1 millisecond' : milliseconds + ' milliseconds') : ''}`
    } else {
        if (!duration || duration < 1000) return '0 seconds';
        result = `${days ? (days === 1 ? '1 day ' : days + ' days ') : ''}${hours ? (hours === 1 ? '1 hour ' : hours + ' hours ') : ''}${minutes ? (minutes === 1 ? '1 minute ' : minutes + ' minutes ') : ''}${seconds ? (seconds === 1 ? '1 second' : seconds + ' seconds') : ''}`
    }

    if (result.endsWith(' ')) result = result.slice(0, -1);
    return result;

}