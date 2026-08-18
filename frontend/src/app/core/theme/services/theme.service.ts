import { Injectable, DOCUMENT, REQUEST, inject, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'
import { Theme, ResolvedTheme } from '../models/theme-model'

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  //Request SSR
  private readonly request = inject(REQUEST, {optional: true});

  private readonly cookieName = 'health-theme';

  /*Tema por el Usuario*/
  readonly theme = signal<Theme>('light');

  /*Tema aplicado*/
  readonly resolvedTheme = signal<ResolvedTheme>('light');

  /*Esta activo*/
  readonly isDark = signal<boolean>(false);

  //Sistema de Temas
  initialize(): void {
    const theme = this.getStoredTheme();

    this.theme.set(theme);

    const resolved = this.resolveTheme(theme);
    this.applyTheme(resolved);
  }

  /*Iniciar el tema*/
  setTheme(theme: Theme): void{
    this.theme.set(theme);

    const resolved = this.resolveTheme(theme);
    this.resolvedTheme.set(resolved);
    this.applyTheme(resolved);

    /*Gestionar las cookies*/
    if(isPlatformBrowser(this.platformId)){
      this.saveThemeCookie(theme);
    }
  }

  toggleTheme(): void {
    //Tema actual
    const current = this.resolvedTheme();
    //Cambiar el tema actual
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  private getStoredTheme(): Theme {
    //SSR y la Cookie
    if(this.request){
      const cookieHeader = this.request.headers.get('cookie');
      return this.getThemeFromCookie(cookieHeader);
    }
    //Navegador
    if(isPlatformBrowser(this.platformId)){
      return this.getThemeFromCookie(document.cookie);
    }
    return 'light';
  }

  private getThemeFromCookie(cookieHeader: string | null): Theme {
    /* Extraer el tema */
    if(!cookieHeader){
      return 'light';
    }

    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const themeCookie = cookies.find(cookie => cookie.startsWith(`${this.cookieName}=`));

    if(!themeCookie){
      return 'light';
    }

    const value = themeCookie.substring(this.cookieName.length + 1);

    if (value === 'dark' || value === 'light' || value === 'system') {
      return value;
    }

    return 'light';
  }

  private resolveTheme(theme: Theme): ResolvedTheme {
    /*Resolver el tema*/
    if (theme === 'light') {
      return 'light';
    }

    if (theme === 'dark') {
      return 'dark';
    }

    /*Acceso por SSR*/
    if(!isPlatformBrowser(this.platformId)){
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  /*Aplicar en el elemento HTMl - Sintaxis de Tailwind*/

  private applyTheme(theme: ResolvedTheme): void {
    const root = this.document.documentElement;

    root.classList.toggle('dark', theme === 'dark');

    root.style.colorScheme = theme;

    this.resolvedTheme.set(theme);

    this.isDark.set(theme === 'dark');
  }

  /*Guardar la Cookie*/

  private saveThemeCookie(theme: Theme): void {

    const maxAge = 60 * 60 * 24 * 365; //Un año la Cookie

    document.cookie =
        `${this.cookieName}=${theme};` +
        `path=/;` +
        `max-age=${maxAge};` +
        `SameSite=Lax`;

  }
}
