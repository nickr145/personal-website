import React from 'react';
import './card.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, style, className }) => (
  <div className={"card" + (className ? ` ${className}` : '')} style={style}>
    <h2 className="card-title">{title}</h2>
    <div className="card-content">{children}</div>
  </div>
);

export default Card;
