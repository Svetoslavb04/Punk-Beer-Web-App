import { useEffect, useMemo, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { PunkAPIBeer } from '../../../interfaces/PunkAPIBeer';
import { Beer } from '../../../interfaces/Beer';

import BeerCard from '../../../components/ui/BeerCard';
import { useAudio } from '../../../hooks/useAudio';

const GetRandomBeer = () => {
  const [showBeerModal, setShowBeerModal] = useState(false);

  const [beer, setBeer] = useState<Beer | null>(null);

  const { play } = useAudio('assets/beer-bottle-opening.mp3');

  const abortController = useMemo(() => new AbortController(), [showBeerModal, beer]);

  useEffect(() => {
    async function fetchBeer() {
      if (showBeerModal) {
        try {
          const res = await fetch('https://api.punkapi.com/v2/beers/random', {
            signal: abortController.signal,
          });
          const punkBeer: PunkAPIBeer = (await res.json())[0];

          setBeer({
            id: punkBeer.id,
            name: punkBeer.name,
            description: punkBeer.description,
            imageUrl: punkBeer.image_url,
          });
        } catch (error) {}
      }
    }
    fetchBeer();
  }, [showBeerModal]);

  const handleGetRandomBeer = async () => {
    setShowBeerModal(true);
  };

  const handleModalHide = () => {
    abortController.abort();
    setShowBeerModal(false);
    setBeer(null);
  };

  const handleStarClick = () => {};

  return (
    <>
      <Button onClick={handleGetRandomBeer}>Get random Beer</Button>
      <Modal show={showBeerModal} centered onHide={handleModalHide}>
        <Modal.Header closeButton className="py-1">
          <Modal.Title className="fs-5">Random beer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {beer ? (
            <BeerCard beer={beer} onBeerImageClick={play} onStarClick={handleStarClick} />
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GetRandomBeer;
