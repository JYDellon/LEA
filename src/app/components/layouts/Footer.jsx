import React from "react";
import NewsletterForm from "./Newsletter";
import Pinterest from "./../../assets/images/icons/pinterest.svg";
import Facebook from "./../../assets/images/icons/facebook.svg";
import Twitter from "./../../assets/images/icons/twitter.svg";
import Tiktok from "./../../assets/images/icons/tiktok.svg";
import Instagram from "./../../assets/images/icons/instagram.svg";
import Youtube from "./../../assets/images/icons/youtube.svg";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-customDark text-white">
      <div className="container mx-auto max-w-screen-xl w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-8">
          <div className="sm:col-span-1 flex flex-col">
            <h3 className="text-size16 font-medium mb-1 sm:mb-2">Nos produits</h3>
            <ul>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Soin du visage
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Soin corporel
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Soin capillaire
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Protection solaire
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Compléments alimentaires
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Coffret & kit d'essai
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Santé & bien-être
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-1 flex flex-col">
            <h3 className="text-size16 font-medium mb-1 sm:mb-2">
              Aide et service
            </h3>
            <ul>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Mon compte
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Retours et échanges
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Suivi de ma commande
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Conditions Générales d'Utilisation
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Conditions Générales de&nbsp;Vente
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-1 flex flex-col">
            <h3 className="text-size16 font-medium mb-1 sm:mb-2">À Propos</h3>
            <ul>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Qui sommes-nous&nbsp;?
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to={URL_HOME}
                  className="link inline-block text-white hover:text-customLightGrey font-normal"
                >
                  Plan du site
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-1 flex flex-col mt-3 sm:mt-0">
            <div className="flex flex-wrap gap-3 mb-3">
              <img src={Pinterest} alt="pinterest" />
              <img src={Facebook} alt="facebook" />
              <img src={Instagram} alt="instagram" />
              <img src={Tiktok} alt="tiktok" />
              <img src={Youtube} alt="youtube" />
              <img src={Twitter} alt="twitter" />
            </div>
            <NewsletterForm />
          </div>
        </div>
        <hr className="my-5" />
        <div className="text-sm grid grid-cols-1 sm:gap-8">
          2023 AquaElixir. Tous&nbsp;droits&nbsp;réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
