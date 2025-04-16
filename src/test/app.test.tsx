/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('exibe os dois logos com os links corretos', () => {
    const viteImg = screen.getByAltText('Vite logo');
    expect(viteImg).toBeInTheDocument();
    expect(viteImg.closest('a')).toHaveAttribute('href', 'https://vite.dev');

    const reactImg = screen.getByAltText('React logo');
    expect(reactImg).toBeInTheDocument();
    expect(reactImg.closest('a')).toHaveAttribute('href', 'https://react.dev');
  });

  it('renderiza o título principal', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Vite + React');
  });

  it('exibe o contador iniciando em zero e incrementa ao clicar', async () => {
    const button = screen.getByRole('button', { name: /count is 0/i });
    await userEvent.click(button);
    expect(button).toHaveTextContent('count is 1');
  });

  it('mostra o texto de instrução de edição', () => {
    // Regex que não quebra por causa das tags internas
    const regex = /Edit[\s\S]*save to test HMR\.\.\./i;
    const paragraph = screen.getByText(regex);
    expect(paragraph).toBeInTheDocument();
  });

  it('mostra o parágrafo de “learn more”', () => {
    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i),
    ).toBeInTheDocument();
  });
});
