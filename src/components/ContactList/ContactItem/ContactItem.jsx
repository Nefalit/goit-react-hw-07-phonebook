import { memo } from 'react';
import PropTypes from 'prop-types';
import s from './contactItem.module.css';

const ContactItem = ({ name, phone, onClick }) => {
  return (
    <li className={s.items}>
      <p>
        {name} : <span className={s.span}>{phone}</span>
      </p>
      <button type="button" className={s.btn} onClick={onClick}>
        Delete
      </button>
    </li>
  );
};

export default memo(ContactItem);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
