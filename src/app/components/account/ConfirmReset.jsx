import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmReset = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    // Déterminer le message à afficher en fonction du statut
    let message;
    switch (status) {
        case 'success':
            message = 'Mot de passe changé avec succès!';
            break;
        case 'failure':
            message = 'Le changement du mot de passe a échoué.';
            break;
        default:
            message = 'En attente du changement de mot de passe...';
            break;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Changement de mot de passe effectué, veuillez renseigner le nouveau mot de passe envoyé par mail</h1>
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

export default ConfirmReset;
