import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import InputSheet from './components/InputSheet';

const Main: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bible References</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank333</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InputSheet />
      </IonContent>
    </IonPage>
  );
};

export default Main;
