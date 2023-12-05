import {useEffect} from "react";

export default function Logout(){
    useEffect(() => {
        const logout = async () => {
            try {
                // Call your logout API endpoint here
                await fetch('http://localhost:8080/member/logout', {
                    method: 'POST',
                    credentials: 'include',
                });

                window.location.href = '/';
            } catch (error) {
                console.error('Error during logout:', error);
                // Handle error if needed
            }
        };

        logout();
    }, []);

    return (
        <div>
            sign out...
        </div>
    );

}