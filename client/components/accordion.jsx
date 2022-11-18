import React, { useState } from 'react';

export const Accordion = () => {

  const [open, setOpen] = React.useState(false);

  const handleOpenAccordion = () => {
    setOpen(!open);
  };

  return (
    <button onClick={handleOpenAccordion} >hi</button>
  );
};
