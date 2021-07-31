import React from 'react';
import { Link } from 'next/link';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationProduct({products}) {
    const page =1;
  return (
            <Pagination
              page={page}
              count={20}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`hppts:youtube.con`}
                  {...item}
                />
              )}
            />
          );
}
