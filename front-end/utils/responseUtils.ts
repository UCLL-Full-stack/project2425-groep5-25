export const handleResponse = async (response: any) => {
    if (!response.ok) {
        if (response.status === 403) {
            console.error(`Forbidden error: ${response.status}`);
            sessionStorage.setItem('authError', 'You do not have permission to view this page.');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            window.location.href = '/';
            return null;
        } else if (response.status === 401) {
            console.error(`Authentication error: ${response.status}`);
            sessionStorage.setItem('authError', 'You are not authorized. Please log in.');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            window.location.href = '/login';
            return null;
        } else {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message || response.statusText}`);
            throw new Error(errorData.message || 'An error occurred.');
        }
    }
    return await response.json();
};
