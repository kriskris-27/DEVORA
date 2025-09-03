"use client";
import React, { useState } from 'react';

const modules = [
  {
    name: 'Data Handling',
    submodules: [
      {
        name: 'Arrays',
        problems: [
          'Find Maximum Element',
          'Reverse Array',
          'Sum of Elements',
          'Remove Duplicates',
          'Merge Two Arrays',
        ],
      },
      {
        name: 'Objects',
        problems: [
          'Count Properties',
          'Clone Object',
          'Find Key by Value',
          'Merge Objects',
          'Object to Array',
        ],
      },
    ],
  },
  {
    name: 'Operators and Expressions',
    submodules: [
      {
        name: 'Arithmetic Operators',
        problems: [
          'Add Two Numbers',
          'Calculate Average',
          'Simple Calculator',
          'Modulo Operation',
          'Exponentiation',
        ],
      },
      {
        name: 'Logical Operators',
        problems: [
          'Check Even or Odd',
          'Check Leap Year',
          'Compare Numbers',
          'Boolean Expressions',
          'Short Circuit Evaluation',
        ],
      },
    ],
  },
  {
    name: 'Conditional Statements',
    submodules: [
      {
        name: 'If-Else',
        problems: [
          'Positive or Negative',
          'Grade Calculator',
          'Age Group Checker',
          'Number Range',
          'Vowel or Consonant',
        ],
      },
      {
        name: 'Switch Case',
        problems: [
          'Day of Week',
          'Month Name',
          'Calculator Using Switch',
          'Traffic Light',
          'Season Finder',
        ],
      },
    ],
  },
  {
    name: 'Looping',
    submodules: [
      {
        name: 'For Loop',
        problems: [
          'Print 1 to N',
          'Sum of N Numbers',
          'Factorial',
          'Fibonacci Series',
          'Multiplication Table',
        ],
      },
      {
        name: 'While Loop',
        problems: [
          'Reverse Number',
          'Sum of Digits',
          'Palindrome Check',
          'Count Digits',
          'Print Even Numbers',
        ],
      },
    ],
  },
];

const purple = '#a78bfa';

const curvedBox = {
  border: `2px solid ${purple}`,
  borderRadius: '16px',
  background: '#fff',
  color: '#111',
  marginBottom: '1rem',
  boxShadow: '0 2px 8px #ede9fe',
  padding: '1rem 1.5rem',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
};

const subBox = {
  border: `2px solid ${purple}`,
  borderRadius: '14px',
  background: '#111',
  color: '#fff',
  margin: '0.5rem 0 0.5rem 1.5rem',
  padding: '0.75rem 1.25rem',
  boxShadow: '0 1px 4px #ede9fe',
};

const problemBox = {
  border: `2px solid ${purple}`,
  borderRadius: '12px',
  background: '#111',
  color: '#fff',
  margin: '0.5rem 0 0.5rem 3rem',
  padding: '0.5rem 1rem',
  boxShadow: '0 1px 4px #ede9fe',
};

const arrowStyle = {
  marginRight: '0.75rem',
  fontWeight: 700,
  fontSize: '1.1rem',
  color: purple,
  transition: 'transform 0.2s',
};

const problemLinkStyle = {
  color: '#fff',
  fontSize: '1rem',
  margin: '0.3rem 0',
  textDecoration: 'underline',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'inherit',
};

const Page = () => {
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openSubmodule, setOpenSubmodule] = useState<string | null>(null);

  const handleModuleClick = (name: string) => {
    setOpenModule(openModule === name ? null : name);
    setOpenSubmodule(null);
  };

  const handleSubmoduleClick = (name: string) => {
    setOpenSubmodule(openSubmodule === name ? null : name);
  };

  // Placeholder for problem click
  const handleProblemClick = (problem: string) => {
    alert(`You clicked: ${problem}`);
    // You can navigate or open a modal here
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ color: purple, textAlign: 'center', marginBottom: '2rem', fontWeight: 700 }}>
        Programming Course Modules
      </h1>
      {modules.map((module) => (
        <div key={module.name} style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              ...curvedBox,
              background: openModule === module.name ? '#f3e8ff' : '#fff',
              color: '#111',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
            }}
            onClick={() => handleModuleClick(module.name)}
          >
            <span
              style={{
                ...arrowStyle,
                transform: openModule === module.name ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              ▶
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: 600 }}>{module.name}</span>
          </div>
          {openModule === module.name &&
            module.submodules.map((sub) => (
              <div key={sub.name}>
                <div
                  style={{
                    ...subBox,
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    background: openSubmodule === sub.name ? '#4c1d95' : '#111',
                    color: '#fff',
                  }}
                  onClick={() => handleSubmoduleClick(sub.name)}
                >
                  <span
                    style={{
                      ...arrowStyle,
                      color: '#fff',
                      transform: openSubmodule === sub.name ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▶
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{sub.name}</span>
                </div>
                {openSubmodule === sub.name && (
                  <div style={problemBox}>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', listStyle: 'disc' }}>
                      {sub.problems.map((problem) => (
                        <li key={problem} style={{ color: '#fff', fontSize: '1rem', margin: '0.3rem 0' }}>
                          <button
                            style={problemLinkStyle}
                            onClick={() => handleProblemClick(problem)}
                          >
                            {problem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Page;