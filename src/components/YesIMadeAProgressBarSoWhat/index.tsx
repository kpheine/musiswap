import React from 'react';

type ProgressProps = {
  color: string;
  rate: number;
};

const YesIMadeAProgressBarSoWhat = ({ color, rate }: ProgressProps) => {
  const containerStyle = {
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: '200px',
    height: '40px',
  };

  const progressStyle = {
    backgroundColor: color,
    width: `${rate * 100}%`,
    height: '100%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflowX: 'hidden' as 'hidden',
  };

  const textStyle = {
    fontWeight: 'bold' as 'bold', //sometimes fuck typescript
    color: 'transparent',
    fontSize: '1.5em',
    marginRight: '5px',
    textShadow:
      '2px 2px 1px rgba(255,255,255,0.3), -1px -1px 1px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={progressStyle} className={'neumorph'}>
        <span style={textStyle}>{`${(rate * 100).toFixed(0)}%`}</span>
      </div>
    </div>
  );
};

export default YesIMadeAProgressBarSoWhat;
