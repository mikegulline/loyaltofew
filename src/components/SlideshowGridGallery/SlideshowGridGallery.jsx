import { useState } from 'react';
import Carousel from '@/components/Carousel';
import Wrapper from './Wrapper';
import TitleWrapper from './TitleWrapper';
import Title from './Title';
import ToggleButton from './ToggleButton';
import ToggleView from './ToggleView';
import Grid from './Grid';

export default function SlideshowGridGallery({ title, link = null, children }) {
  const [showFirstToggle, setShowFirstToggle] = useState(true);
  if (!children.length) return null;
  return (
    <Wrapper>
      <TitleWrapper>
        <Title content={title} link={link} />
        {children?.length > 3 && (
          <ToggleButton handleClick={setShowFirstToggle}>
            <ToggleView showFirst={showFirstToggle}>
              <>Show Grid</>
              <>Show Slideshow</>
            </ToggleView>
          </ToggleButton>
        )}
      </TitleWrapper>
      <ToggleView showFirst={showFirstToggle}>
        <Carousel>{children}</Carousel>
        <Grid>{children}</Grid>
      </ToggleView>
    </Wrapper>
  );
}
