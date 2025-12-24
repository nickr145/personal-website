import React from 'react';
import './card.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  headerAction?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, style, className, headerAction }) => (
  <div className={"card" + (className ? ` ${className}` : '')} style={style}>
    <div className="card-title-row">
      <h2 className="card-title">{title}</h2>
      {headerAction && <div className="card-title-action">{headerAction}</div>}
    </div>
    <div className="card-content">{children}</div>
  </div>
);

export default Card;
