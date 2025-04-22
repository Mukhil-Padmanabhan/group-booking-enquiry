'use client';

import { ReactNode } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import clsx from 'clsx';

type AccordionProps = {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
};

export default function Accordion({ title, isOpen, onToggle, children }: AccordionProps) {
    const Icon = isOpen ? FaChevronUp : FaChevronDown;

    return (
        <section className="mb-1 rounded shadow-sm border border-gray-200 accordian-theme" data-testid="accordion">
            <button
                type="button"
                className={clsx(
                    'flex items-center justify-between w-full px-4 py-3 text-left font-semibold transition-colors duration-200',
                    isOpen ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200',
                    'text-black'
                )}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
                data-testid="accordion-toggle"
            >
                <span>{title}</span>
                <Icon className="ml-2" />
            </button>

            {isOpen && (
                <div
                    id={`accordion-content-${title.replace(/\s+/g, '-')}`}
                    className="p-4 bg-white"
                    data-testid="accordion-content"
                >
                    {children}
                </div>
            )}
        </section>
    );
}
