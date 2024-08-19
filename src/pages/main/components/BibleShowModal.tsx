import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import './main.css';

function BibleShowModal({ modalText, modalReference, isOpen, setIsOpen }: { modalText: string, modalReference: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

  return (
    <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{modalReference}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div dangerouslySetInnerHTML={{ __html: modalText }} />
      </IonContent>
    </IonModal>
  );
}

export default BibleShowModal;
