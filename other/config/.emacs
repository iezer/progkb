(add-hook 'before-save-hook 'delete-trailing-whitespace)
(setq-default tab-width 2)

;;mode-compile
    (autoload 'mode-compile "mode-compile"
      "Command to compile current buffer file based on the major mode" t)
    (global-set-key "\C-cc" 'mode-compile)
    (autoload 'mode-compile-kill "mode-compile"
      "Command to kill a compilation launched by `mode-compile'" t)
    (global-set-key "\C-ck" 'mode-compile-kill)

(add-to-list 'load-path "~/Code/elisp")

;;(require 'rvm)
;;(rvm-use-default) ;; use rvm's default ruby for the current Emacs session

(setq coffee-tab-width 2)

(require 'project-grep)
(global-set-key (kbd "M-s") 'project-grep)

;;(add-to-list 'load-path "~/.emacs.d/find-file-in-project")
(autoload 'find-file-in-project "find-file-in-project" "Find file in project." t)
(global-set-key (kbd "M-n") 'find-file-in-project)

(add-to-list 'load-path "rspec-mode")
(require 'rspec-mode)
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(rspec-use-rake-when-possible nil))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

(require 'web-mode)
(setq web-mode-code-indent-offset 2)
(add-to-list 'auto-mode-alist '("\\.erb\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.handlebars\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.html?\\'" . web-mode))

(autoload 'scss-mode "scss-mode")
(add-to-list 'auto-mode-alist '("\\.scss\\'" . scss-mode))
(add-to-list 'auto-mode-alist '("\\.sass\\'" . scss-mode))
(add-to-list 'auto-mode-alist '("\\.css.scss\\'" . scss-mode))

(autoload 'css-mode "css-mode" "Mode for editing CSS files" t)
(add-to-list 'auto-mode-alist '("\\.css\\'" . css-mode))
