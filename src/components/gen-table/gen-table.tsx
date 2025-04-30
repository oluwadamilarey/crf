'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import ReactPaginate from 'react-paginate';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const GenTable = ({
  headers,
  tableContainerClassName,
  children,
  totalPages,
  isLoading,
}: {
  headers: string[];
  tableContainerClassName?: string;
  children: ReactNode;
  totalPages?: number;
  isLoading?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  function handlePageChange(clickEvent: { selected: number }) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set('page', `${clickEvent.selected + 1}`);

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <Table className={tableContainerClassName}>
        <TableHeader className='bg-[#F4F4F4]'>
          <TableRow>
            {headers.map((header) => (
              <TableHead className='font-bold py-3.5' key={header}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{children}</TableBody>
      </Table>

      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => {
          return <Skeleton key={index} className='h-12 border-b w-full' />;
        })}

      {!!totalPages && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          forcePage={page - 1}
          containerClassName='flex gap-2 justify-end items-center'
          onPageChange={handlePageChange}
          previousLabel={<PiCaretLeft />}
          nextLabel={<PiCaretRight />}
          previousClassName='flex'
          nextClassName='flex'
          nextLinkClassName='border rounded-md p-2 text-dark/60'
          previousLinkClassName='border rounded-md p-2 text-dark/60'
          disabledLinkClassName='text-dark/20 border-dark/20'
          activeLinkClassName='font-semibold text-primary'
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
};

export default GenTable;
