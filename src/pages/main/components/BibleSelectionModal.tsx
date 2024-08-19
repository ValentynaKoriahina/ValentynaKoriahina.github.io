import React, { useState, useEffect } from 'react';
import { booksChaptersVerses } from './utils/bibleTexts';
import { BibleTexts } from '../../../types'; // Импорт типа
import { getVerse } from './utils/bibleTexts';

import { 
  IonModal, 
  IonButton, 
  IonContent, 
  IonSelect, 
  IonSelectOption, 
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons 
} from '@ionic/react';

// Явное указание типа для объекта из JavaScript модуля
const bibleBooksChaptersVerses: BibleTexts = booksChaptersVerses;

interface BibleSelectionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const BibleSelectionModal: React.FC<BibleSelectionModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedVerse, setSelectedVerse] = useState<string[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [verses, setVerses] = useState<string[]>([]);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    // Обновление списка глав при выборе книги
    if (selectedBook) {
      const chapterNumbers = Object.keys(bibleBooksChaptersVerses[selectedBook]);
      setChapters(chapterNumbers);
      setSelectedChapter('');
      setVerses([]); 
    }
  }, [selectedBook]);

  useEffect(() => {
    // Обновление списка стихов при выборе главы
    if (selectedBook && selectedChapter) {
      const verseCount = bibleBooksChaptersVerses[selectedBook][selectedChapter];
      const verseNumbers = Array.from({ length: verseCount }, (_, i) => (i + 1).toString());
      setVerses(verseNumbers);
    }
  }, [selectedChapter, selectedBook]);

  const handleGoToVerse = () => {
    const reference = `${selectedBook} ${selectedChapter}:${selectedVerse.join(',')}`;
    setModalText(getVerse(reference));
  };

  const handleCloseModal = () => {
    // Выводим выбранные значения в консоль
    setSelectedBook('');
    setSelectedChapter('');
    setSelectedVerse([]);
    setModalText('');
    setIsOpen(false);
  };
  

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleCloseModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Выбор текста</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={ handleCloseModal }>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSelect 
          id="bookSelect" 
          placeholder="Выберите книгу" 
          value={selectedBook}
          interface="popover"
          onIonChange={(e) => setSelectedBook(e.detail.value)}
        >
          {Object.keys(bibleBooksChaptersVerses).sort().map(book => (
            <IonSelectOption key={book} value={book}>
              {book}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonSelect 
          id="chapterSelect" 
          placeholder="Выберите главу" 
          value={selectedChapter}
          interface="popover"
          onIonChange={(e) => setSelectedChapter(e.detail.value)}
          disabled={!selectedBook}
        >
          {chapters.map(chapter => (
            <IonSelectOption key={chapter} value={chapter}>
              {chapter}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonSelect 
          id="verseSelect" 
          placeholder="Выберите стих" 
          multiple 
          value={selectedVerse}
          onIonChange={(e) => setSelectedVerse(e.detail.value)}
          disabled={!selectedChapter}
        >
          {verses.map(verse => (
            <IonSelectOption key={verse} value={verse}>
              {verse}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonButton 
          id="goToVerseButton" 
          disabled={!selectedVerse.length} 
          onClick={handleGoToVerse}
        >
          Перейти
        </IonButton>
        <br />
        <IonText style={{ marginTop: '20px' }}>
          <div dangerouslySetInnerHTML={{ __html: modalText }} />
        </IonText>
      </IonContent>
    </IonModal>
  );
};

export default BibleSelectionModal;