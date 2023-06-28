import React, { useEffect, useContext } from "react";
import PopupWithForm from './PopupWithForm';
import { useInput } from '../hooks/FormValidator.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onUpdateUser, isLoading, ...commonProps }) {

  const currentUser = useContext(CurrentUserContext);

  const login = useInput(currentUser?.name || '', { isEmpty: true, minLength: 2 });
  const about = useInput(currentUser?.about || '', { isEmpty: true, minLength: 2 });

  useEffect(() => {
    if (isOpen) {
      login.resetValidation();
      about.resetValidation();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: login.value,
      about: about.value
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      {...commonProps}

      name='edit-profile'
      title='Редактировать профиль'

      inputValid={login.inputValid && about.inputValid}
      isLoading={isLoading}
      submitText='Сохранить'
      submitTextLoading='Сохранение...'
      onSubmit={handleSubmit}
    >
      <label className="form__item">
        <input
          onChange={login.onChange}
          onFocus={login.onFocus}
          value={login.value}
          type="text"
          className={`form__input ${login.isDirty && (login.isEmpty || login.minLengthError || login.maxLengthError) ? "form__input_type_error" : ""}`}
          placeholder='Имя'
          name="login"
          id="name-input"
          minLength="2"
          maxLength="40"
          required
        />
        {login.isDirty &&
          (login.isEmpty
            ? <span className="form__input-error">Это обязательное поле</span>
            : ((login.minLengthError || login.maxLengthError) && <span className="form__input-error">Должно быть от 2 до 40 символов</span>)
          )
        }
      </label>

      <label className="form__item">
        <input
          onChange={about.onChange}
          onFocus={about.onFocus}
          value={about.value}
          type="text"
          className={`form__input ${about.isDirty && (about.isEmpty || about.minLengthError || about.maxLengthError) ? "form__input_type_error" : ""}`}
          placeholder='О себе'
          name="about"
          id="about-input"
          minLength="2"
          maxLength="200"
          required
        />
        {about.isDirty &&
          (about.isEmpty
            ? <span className="form__input-error">Это обязательное поле</span>
            : ((about.minLengthError || about.maxLengthError) && <span className="form__input-error">Должно быть от 2 до 200 символов</span>)
          )
        }
      </label>

    </PopupWithForm>
  )
}

export default EditProfilePopup;
