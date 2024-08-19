import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { bookOutline } from 'ionicons/icons';

interface FloatingButtonProps {
  onClick: (isBibleSelectionModalOpen: boolean) => void;
}

function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={() => onClick(true)}>
          <IonIcon icon={bookOutline} />
        </IonFabButton>
      </IonFab>
    </>
  );
}

export default FloatingButton;
