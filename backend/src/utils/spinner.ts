import readline from 'readline';
import { green, red } from 'chalk';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const stepMessageDefault = 'Undefined pancake';


class Spinner {
  private isSpinnerRunning = false;
  private spinnerIndex = 0;
  private spinnerInterval!: NodeJS.Timeout;
  private timeoutMilliseconds!: NodeJS.Timeout | null;
  private steps: Map<number, string> = new Map();
  private stepsIndex = 0;
  private maxStepsIndex = 0;
  private maxStepsCount = 0;

  private successMessage: string | undefined;
  private failureMessage: string | undefined;

  // Sets the failure and success messages
  constructor(successMessage?: string, failureMessage?: string) {
    this.successMessage = successMessage;
    this.failureMessage = failureMessage;
  }

  /**
   * Adds a new step to the spinner process.
   *
   * @param id The step id
   * @param stepDescription The description of the step
   * @throws {Error} If a step with the same ID already exists
   * @throws {Error} If the step ID is less than 1
   *
   */
  public addStep(stepDescription: string, id?: number) {
    if (!id) {
      id = this.maxStepsIndex++;
    }
    if (this.steps.has(id)) {
      throw new Error('A step with the same ID already exists');
    }
    if (id < 0) {
      throw new Error('Step ID must be greater than 0');
    }

    this.maxStepsCount++;
    this.steps.set(id, stepDescription);
  }

  /**
   * Changes the message of a step in the spinner process.
   *
   * @param id The step id
   * @param message The new message for the step
   * @throws {Error} If no step with the given ID exists
   */
  public changeStep(id: number, message: string) {
    if (!this.steps.has(id)) {
      throw new Error('No step with the given ID');
    }

    this.steps.set(id, message);
  }

  /**
   * Starts a spinner
   *
   * @param message The message after the spinner
   * @param timeout The timeout for the spinner in milliseconds
   * @param timeout_message The message optionnaly to display when the spinner times out
   * @throws {Error} If a spinner is already running
   */
  public start(timeout?: number, timeout_message?: string) {
    if (this.isSpinnerRunning) {
      throw new Error('A spinner is already running');
    }

    this.maxStepsCount = this.steps.size;

    this.spinnerInterval = setInterval(() => {
      const next_frame_index = this.spinnerIndex++ % spinnerFrames.length;
      const frame = spinnerFrames[next_frame_index];
      const stepMessage = this.steps.get(this.stepsIndex) || stepMessageDefault;

      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${frame} ${stepMessage}`);
  }, 80);

    if (timeout) {
      this.timeoutMilliseconds = setTimeout(() => {
        this.stopFailure(timeout_message || 'Operation timed out');
      }, timeout);
    }

    this.isSpinnerRunning = true;
  }

  /**
   * Moves to the next step in the spinner's step map.
   *
   * @throws {Error} If there are no more steps to move to
   */
  public endStep() {
    if (this.stepsIndex > this.steps.size) {
      throw new Error('No more steps to move to');
    }

    this.printStepResult(green, '✔');
    this.stepsIndex++;
  }

  private printStepResult(color: (message: string) => string = green, symbol: string) {
    const stepMessage = this.steps.get(this.stepsIndex) || stepMessageDefault;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`[${this.stepsIndex+1}/~${this.maxStepsCount}] ${symbol} ${color(stepMessage)}`);
    console.log('');
  }

  /**
   * Stops the spinner and prints a message.
   *
   * @param message The success message after the spinner stops.
   * @param color The color of the message
   * @throws {Error} If no spinner is running
   */
  private _stop(message: string, color: (message: string) => string, symbol: string) {
    if (!this.isSpinnerRunning) {
      throw new Error('No spinner is running');
    }

    clearInterval(this.spinnerInterval);
    clearTimeout(this.timeoutMilliseconds as NodeJS.Timeout);

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    const message_len = message.length ? message.length : 30;
    const separator = '-'.repeat(message_len + 2);
    console.log(`${separator}\n${symbol} ${color(message)}\n${separator}`);
    this.steps.clear();

    this.isSpinnerRunning = false;
  }

  /**
   * Stops the spinner and prints a success message.
   *
   * @param message The success message after the spinner stops.
   * @throws {Error} If no spinner is running
  */
  public stop(message?: string) {
    if (this.stepsIndex !== this.maxStepsCount) {
      this.printStepResult(green, '✔');
    }

    this._stop(message || this.successMessage || 'Operation successful', green, '✔');
  }

  /**
   * Stops the spinner and prints a failure message.
   *
   * @param message The failure message after the spinner stops.
   * @throws {Error} If no spinner is running
  */
  public stopFailure(message?: any, override: boolean = false) {
    this.printStepResult(red, '✖');

    // this._stop(message || this.failureMessage || 'Operation failed', red, '✖');

    if (override) {
      this._stop(`${message}`, red, '✖');
    } else {
      this._stop(`${this.failureMessage}${message ? (' : [' + message + `]`): ''}`, red, '✖');
    }
  }
}

export default Spinner;
