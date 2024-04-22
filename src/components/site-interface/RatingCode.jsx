import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating({ratingCount}) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={Number(ratingCount)} precision={0.1} readOnly />
    </Stack>
  );
}
