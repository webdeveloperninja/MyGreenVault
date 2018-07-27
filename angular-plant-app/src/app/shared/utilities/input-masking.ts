import * as masks from 'text-mask-addons/dist/textMaskAddons';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const zipMask = [/\d/, /\d/, /\d/, /\d/, /\d/];
export const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export const dollarAndCentsMask = createNumberMask({
  prefix: '$',
  suffix: '',
  allowDecimal: true
});

export const numberMask = createNumberMask({
  suffix: '',
  allowDecimal: false
});

export const removeDollarAndCentsMask = maskedNumber => {
  return maskedNumber
    .replace('$', '')
    .replace(',', '')
    .trim();
};

export const removePhoneMask = maskedPhoneNumber => {
  return maskedPhoneNumber
    .replace('(', '')
    .replace('-', '')
    .replace(')', '')
    .replace(' ', '')
    .trim();
};

export const emailMask = masks.emailMask;
