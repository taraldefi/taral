import { runCLI } from '../helpers';

describe('oracle', () => {
  it('should display the help contents', () => {
    const { stdout } = runCLI(process.cwd(), ['--help']);

    expect(stdout).toContain('Usage: oracle [options]');
  });
});
