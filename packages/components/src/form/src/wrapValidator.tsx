import { warn } from '../../_utils'
import type {
  FormItemRuleValidator,
  FormItemRuleValidatorParams
} from './interface'

// Wrapped Validator is to be passed into async-validator
// In their source code, validator can be a asyncValidator.
// asyncValidator will non-promise return value will be ignored.
// We need to deal with some type quirks.
export type WrappedValidator = (
  ...args: FormItemRuleValidatorParams
) => boolean | Error | Error[] | Promise<void> | undefined

// wrap sync validator
export function wrapValidator (
  validator: FormItemRuleValidator,
  async: boolean
): WrappedValidator {
  return (...args: Parameters<FormItemRuleValidator>) => {
    try {
      const validateResult = validator(...args)
      if (
        (!async &&
          (typeof validateResult === 'boolean' ||
            validateResult instanceof Error ||
            Array.isArray(validateResult))) || // Error[]
        (validateResult as any)?.then
      ) {
        return validateResult as any
      } else if (validateResult === undefined) {
        return true
      } else {
        warn(
          'form-item/validate',
          `You return a ${typeof validateResult} ` +
            'typed value in the validator method, which is not recommended. Please use ' +
            (async ? '`Promise`' : '`boolean`, `Error` or `Promise`') +
            ' typed value instead.'
        )
        return true
      }
    } catch (err) {
      warn(
        'form-item/validate',
        'An error is catched in the validation, ' +
          "so the validation won't be done. Your callback in `validate` method of " +
          "`z-form` or `z-form-item` won't be called in this validation."
      )
      console.error(err)
      // If returns undefined, async-validator won't trigger callback
      // so the result will be abandoned, which means not true and not false
      return undefined
    }
  }
}
