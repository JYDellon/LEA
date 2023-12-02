import React, { useState } from "react";
import ContactForm from "../components/pages/ContactForm";
import { URL_CONTACT, URL_HOME } from "../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";


const ContactView = () => {
  const [questions] = useState([
    {
      id: 1,
      question: "Comment suivre mon colis ?",
      answer:
        "Dès lors que votre colis sera expédié, vous recevrez une notification par mail incluant un lien vous permettant de suivre son expédition. Vous pouvez suivre votre commande à tout moment en cliquant ici.",
    },
    {
      id: 2,
      question: "Comment créer un compte sur le site AquaElixir ?",
      answer:
        "Cliquez sur l’icône « Mon compte » sur la barre de navigation. Cliquez ensuite sur « Créer un compte ». Il vous suffit de renseigner vos coordonnées. Choisissez votre mot de passe et confirmez la création de votre compte.",
    },
    {
      id: 3,
      question: "Comment puis-je modifier mes coordonnées ?",
      answer:
        "Connectez-vous à votre compte en cliquant sur l'icône « Mon compte » en indiquant votre adresse e-mail et votre mot de passe. Cliquez sur la rubrique « Mes informations » et modifiez vos coordonnées.",
    },
    {
      id: 4,
      question: "Quels sont les coûts et délais de livraison ?",
      answer:
        "Vous êtes livrés dans un délai de 2 à 5 jours à compter de la validation de votre commande si celle-ci intervient du lundi au vendredi. Les livraisons s’entendent en France Métropolitaine (dont Corse) et Monaco. Les frais d'envoi sont offerts.",
    },
    {
      id: 5,
      question: "Quelles sont les modalités de retour ou d'échange ?",
      answer:
        "Vous avez changé d'avis ? Vous disposez de 14 jours pour nous retourner votre colis. Merci de nous retourner votre produit dans son emballage d'origine, en parfait état, et accompagné de son bordereau de livraison ou de votre facture. Pour en savoir plus, merci de vous référer aux Conditions Générales de Vente.",
    },
  ]);

  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (id) => {
    setActiveQuestion(id === activeQuestion ? null : id);
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto pl-4 py-5 text-sm font-medium">
        <Link to={URL_HOME}>Accueil</Link> |{" "}
        <Link to={URL_CONTACT}>Contact</Link>
      </div>
      <div className="bg-customBeige p-5 w-full">
        <div className="max-w-screen-md text-center mx-auto p-5">
          <h1 className="text-size32 font-bold pb-5">Nous contacter</h1>
          <p>
            Une question ? Une demande ? Afin que nous puissions vous aider
            aussi rapidement que possible, veuillez inclure autant
            d'informations que possible concernant le problème que vous
            rencontrez. Vous devriez recevoir une réponse dans les 72h.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl w-full bg-white md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 xl:pl-0 xl:pr-20 flex flex-col justify-center">
            <ContactForm />
          </div>
          <div className="flex flex-col p-4 md:my-10 mb-10">
            <h2 className="text-lg font-bold tracking-[-0.5px]">
              Questions les plus fréquentes
            </h2>
            <div className="w-full max-w-screen-md">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`mt-4 faq-item ${
                    activeQuestion === q.id ? "active" : ""
                  }`}
                  onClick={() => handleQuestionClick(q.id)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold faq-border">{q.question}</p>
                    {activeQuestion === q.id ? "-" : "+"}
                  </div>
                  {activeQuestion === q.id && (
                    <div className="ml-6 mt-2 text-gray-700">{q.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactView;
