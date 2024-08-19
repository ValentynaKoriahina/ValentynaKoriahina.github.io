declare global {
  interface Window {
    handleLinkClick: (cleanedReference: string, originalReference: string) => void; // Объявляем функцию в глобальном контексте
  }
}

import { useState, useEffect } from 'react';
import { IonContent, IonTextarea, IonText, IonButton } from '@ionic/react';

import BibleShowModal from './BibleShowModal';
import BibleSelectionModal from './BibleSelectionModal';
import FloatingButton from './FloatingButton'

import './main.css';

import { processText } from './utils/utils';
import { getVerse } from './utils/bibleTexts';

function InputSheet() {
  const [convertedText, setConvertedText] = useState('');
  const [isBibleShowModalOpen, setIsBibleShowModalOpen] = useState(false);
  const [isBibleSelectionModalOpen, setIsBibleSelectionModalOpen] = useState(false);

  const [modalReference, setModalReference] = useState('');
  const [modalText, setModalText] = useState('');

  const handleLinkClick = (cleanedReference: string, originalReference: string) => {
    const verseText = getVerse(cleanedReference); // Получаем текст стиха
    setModalReference(originalReference);
    setModalText(verseText); // Устанавливаем текст стиха в содержимое модального окна
    setIsBibleShowModalOpen(true); // Открываем модальное окно
  };

  useEffect(() => {
    // Привязываем функцию к глобальному объекту window
    window.handleLinkClick = handleLinkClick;
  }, [handleLinkClick]);

  const handleProcessClick = () => {
    const textarea = document.querySelector('ion-textarea');
    const currentText = textarea?.value as string;
    setConvertedText(processText(currentText));
  };

  return (
    <IonContent className="ion-padding">
      <IonTextarea clearOnEdit={true} placeholder="Вставьте текст" 
      value="ексты Писания: 2 Тим. 1:9; Рим. 8:28-29; Эф. 3:9-11; Кол. 1:9; Отк. 4:11; Мф. 7:21 День 
      I. Во 2 Тим. 1:9 Павел говорит, что Бог «спас нас и при-звал святым призванием — не согласно нашим делам, а согласно собственному замыслу»: А. Бог не только спас нас, чтобы мы наслаждались Его благословением, но и призвал нас святым призванием, призванием для особого дела — чтобы исполнить Его замысел — ст. 9; Рим. 8:28. Б. Быть призванными Богом — значит быть отделён-ными для Его замысла — Эф. 1:11; 3:11; 2 Тим. 1:9; 3:10.
      В. Замысел во 2 
      " />
      <IonButton onClick={handleProcessClick}>
        Обработать
      </IonButton>
      <IonText>
        <div className="output" dangerouslySetInnerHTML={{ __html: convertedText }} />
      </IonText>
      <BibleShowModal modalText={modalText} modalReference={modalReference} isOpen={isBibleShowModalOpen} setIsOpen={setIsBibleShowModalOpen} />
      <BibleSelectionModal isOpen={isBibleSelectionModalOpen} setIsOpen={setIsBibleSelectionModalOpen}/>
      <FloatingButton onClick={setIsBibleSelectionModalOpen}></FloatingButton>
    </IonContent>
  );
}

export default InputSheet;
