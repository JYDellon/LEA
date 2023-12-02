import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    let message;
    switch (status) {
        case 'success':
            message = 'E-mail confirmé avec succès!';
            break;
        case 'failure':
            message = 'La confirmation de l\'e-mail a échoué.';
            break;
        default:
            message = 'En attente de confirmation...';
            break;
    }

    // Fonction pour gérer la redirection
    const handleRedirection = () => {
        navigate('/authentification/login');
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bienvenue sur AquaElixir</h1>
            <p>{message}</p>
            {status === 'success' && (
                <div>
                    <button 
                        onClick={handleRedirection} 
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                    >
                        Se connecter
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmEmail;
