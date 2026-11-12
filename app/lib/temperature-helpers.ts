/**
 * Converts Celsius to Fahrenheit.
 * @param celsius The temperature in Celsius.
 * @returns The temperature in Fahrenheit.
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Converts Celsius to Kelvin.
 * @param celsius The temperature in Celsius.
 * @returns The temperature in Kelvin.
 */
export function celsiusToKelvin(celsius: number): number {
  return celsius + 273.15;
}

/**
 * Converts Fahrenheit to Celsius.
 * @param fahrenheit The temperature in Fahrenheit.
 * @returns The temperature in Celsius.
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Converts Fahrenheit to Kelvin.
 * @param fahrenheit The temperature in Fahrenheit.
 * @returns The temperature in Kelvin.
 */
export function fahrenheitToKelvin(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}

/**
 * Converts Kelvin to Celsius.
 * @param kelvin The temperature in Kelvin.
 * @returns The temperature in Celsius.
 */
export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

/**
 * Converts Kelvin to Fahrenheit.
 * @param kelvin The temperature in Kelvin.
 * @returns The temperature in Fahrenheit.
 */
export function kelvinToFahrenheit(kelvin: number): number {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}
