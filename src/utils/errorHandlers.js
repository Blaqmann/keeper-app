export const handleAuthError = (error, setError, setModalIsOpen) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            setError('This email is already in use.');
            break;
        case 'auth/invalid-email':
            setError('This email is invalid.');
            break;
        case 'auth/invalid-credential':
            setError('Invalid credentials.');
            break;
        case 'auth/operation-not-allowed':
            setError('Operation not allowed.');
            break;
        case 'auth/missing-password':
            setError('Password can not be empty.');
            break;
        case 'auth/weak-password':
            setError('Password should be at least 6 characters.');
            break;
        case 'auth/user-disabled':
            setError('This user has been disabled.');
            break;
        case 'auth/user-not-found':
            setError('No user found with this email.');
            break;
        case 'auth/wrong-password':
            setError('Wrong password.');
            break;
        default:
            setError('An unexpected error occurred. Please try again.');
    }
    setModalIsOpen(true);
};
