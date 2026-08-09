# Journal des modifications

Tous les changements notables apportés à ce projet sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), et ce projet adhère au [Versionnage sémantique](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-08-01

### Ajouté
- **Intégration Lark Suite** — Relie le serveur MCP officiel de Lark/Feishu pour la messagerie, les discussions, le calendrier, Base, les documents et les tâches via une connexion « apportez votre propre application ».
- **Intégration LemonSqueezy** — Pont REST direct pour gérer les commandes, les clients, les abonnements, les réductions et les clés de licence.
- **Intégration Kit (ConvertKit)** — Pont REST direct pour gérer les abonnés, les diffusions, les séquences et les tags.
- **Prise en charge de la déconnexion MCP Hub** — Chaque service connecté dispose désormais d'un moyen en un clic pour effacer ses identifiants et se déconnecter.
- **Intégration Audacity** — Contrôlez une instance Audacity en cours d'exécution directement via son propre protocole de script pour l'édition audio et les effets.
- **Notes, Rappels Apple et export Office** — Prise en charge native de Notes/Rappels, export réel Excel/PowerPoint/Word depuis Numbers/Keynote/Pages, et suppression d'arrière-plan sur l'appareil.

### Corrigé
- **Fiabilité de la recherche web et des citations** — Correction d'une série de problèmes de réponses de recherche, notamment des résultats de recherche perdus, de faux rejets de « réponse incomplète » et des citations mal signalées.
- **Découvrabilité des nouveaux outils** — Notes, Rappels, suppression d'arrière-plan et les outils de documents Office sont désormais correctement accessibles pour des demandes simples.
- **Achèvement des tâches en plusieurs étapes** — Correction des cas où l'agent pouvait décrire une prochaine étape sans l'exécuter, ou marquer un rapport comme terminé sans l'avoir rédigé.
- **Fiabilité de la mémoire et du rappel** — Les demandes « souviens-toi de ça » sont désormais enregistrées de manière fiable au lieu de ne rien faire silencieusement.
- **Logique de nouvelle tentative d'outil plus sûre** — Un outil désactivé après des échecs répétés récupère désormais automatiquement, et les restrictions permanentes sont signalées immédiatement plutôt que retentées.
- **Précision des dates du calendrier** — Correction d'un bug où les événements pouvaient être enregistrés silencieusement avec une date incorrecte.
- **Corrections d'intégration Stripe et Git** — Correction de l'ensemble d'actions de Stripe après un changement en amont, et stabilisation de l'intégration Git MCP.
- **Sécurité des opérations sur fichiers et dossiers** — Correction de cas limites dans les vérifications de permissions de chemin et le comportement de déplacement/copie de dossiers.
- **Fiabilité générale** — Corrections mineures concernant la livraison de télémétrie, l'automatisation du navigateur, les budgets de délai d'expiration et la détection de charge système.

## [1.0.5] - 2026-07-24

### Corrigé
- **Sécurité des citations de sources** — Correction d'un problème où l'agent pouvait citer des URL sources, dates ou numéros de version inexistants, en déplaçant les vérifications de sécurité des citations vers le chemin d'exécution actif.
- **Exécution des demandes composées** — Correction d'un problème où les demandes composées en plusieurs parties (par ex. demander la télémétrie et la version du système en même temps) pouvaient ne renvoyer qu'une réponse partielle, en imposant les appels d'outils manquants.
- **Sécurité de la redirection de sortie shell** — Empêché les redirections shell simples vers un seul fichier (`command > file`) de contourner la protection binaire et les vérifications de sécurité d'écriture.
- **Détection de bots et filtrage CAPTCHA** — La recherche web détecte et filtre désormais les pages CAPTCHA/de vérification anti-bot des moteurs de recherche pour empêcher le raisonnement d'être influencé par ce texte.
- **Stabilisation JS de la recherche Google** — Amélioration de la récupération des résultats de recherche Google en attendant la fin du rendu JavaScript côté client.
- **Robustesse du repli Safari** — Ouvre réellement des onglets Safari visibles pour le repli de recherche, avec des indications de permission claires si nécessaire.
- **Concurrence biométrique et Trousseau** — Correction de la gestion du délai d'expiration de Touch ID et déblocage des lectures du Trousseau en arrière-plan qui bloquaient les vérifications de disponibilité des outils.
- **Limites de nouvelle tentative du daemon** — Empêché les connexions de daemon en arrière-plan échouées de se retenter indéfiniment.

### Ajouté
- **Recherche de sources faisant autorité** — L'agent priorise désormais les données officielles du projet, les spécifications structurées et la documentation directe plutôt que les extraits de recherche tiers.
- **Ensembles d'outils GitHub étendus** — Ajout de l'accès à GitHub Actions, à la sécurité du code, à Dependabot, aux discussions, aux avis, aux gists, aux projets, aux labels et aux notifications.

## [1.0.4] - 2026-07-06

### Ajouté
- **Ponts d'outils MCP** — Pheron Agent s'intègre désormais avec des serveurs Model Context Protocol (MCP) externes, notamment Git, l'automatisation de navigateur Playwright, la recherche web Perplexity, Stripe, GitHub, Notion, Unreal Engine et Zapier.
- **MCP Hub et connexions** — Ajout d'un assistant dédié en grille de cartes dans Réglages > Connexions pour configurer, enregistrer et tester facilement les identifiants des connexions d'outils externes.
- **Recommandations contextuelles** — L'agent suggère désormais de connecter les intégrations manquantes dans Réglages > Connexions lorsqu'une tâche nécessite un outil protégé par des identifiants.
- **Raisonnement unifié écran et accessibilité** — Enchaînement des descriptions de capture d'écran, de l'OCR et de l'analyse de l'arbre d'accessibilité (AX) pour des actions liées au navigateur/écran plus cohérentes et fiables.
- **Profil utilisateur local** — Les préférences découvertes par l'agent et les informations d'identité de l'utilisateur sont désormais enregistrées dans un profil Markdown lisible (`UserProfile.md`).
- **Refonte de l'onglet Performance** — Fusion des onglets Santé et Analytique sous Réglages en un seul onglet avec des graphiques de tendance en temps réel de l'utilisation du CPU, de la mémoire et de la vitesse.
- **Prise en charge de la télémétrie disque** — Les rapports de télémétrie incluent désormais l'espace libre du volume de démarrage en plus des statistiques CPU et mémoire.

### Corrigé
- **Contexte de conversation multi-tours** — Correction de la perte de contexte entre des tours consécutifs dans le même fil de conversation, garantissant que l'agent se souvienne du contexte immédiat.
- **Limites de contexte du modèle** — Correction de problèmes de mise à l'échelle du budget de contexte du modèle local qui restreignaient artificiellement les fenêtres de tokens utilisables sur les systèmes disposant de plus de RAM.
- **Corrections de boucles de mémoire** — Résolution d'un déclencheur de boucle d'appel d'outil lors de la recherche de détails de rappel utilisateur (par ex. « te souviens-tu de mon nom ? »).
- **Stabilité du Trousseau et de l'authentification** — Correction des rappels de flux OAuth pour Notion/Zapier et restauration des entrées de Trousseau supprimées lors des exécutions de tests locaux.
- **Performance lors du changement de tâche** — Arrêt immédiat des processus en arrière-plan et des exécutions de commandes en cas d'expiration du délai ou d'annulation de tâche, afin d'éviter les fuites de CPU.
- **Routage des prépositions de commande en turc** — Correction d'un bug de routage incorrect où les invites en turc contenant « üzerinden » (via) étaient envoyées à tort vers le chemin mathématique/calcul.

## [1.0.3] - 2026-06-19

### Ajouté
- **Mémoire personnelle et rappel** — l'agent se souvient désormais de manière fiable et fait ressortir les informations que vous avez explicitement partagées (parcours, CV, préférences) lorsque vous les demandez ; comblement d'une lacune de récupération profonde où les informations enregistrées pouvaient devenir effectivement introuvables
- **Commandes de fichiers/dossiers multilingues** — les demandes du type « organise ce dossier » sont désormais reconnues dans 13 langues (ES, FR, DE, PT, IT, RU, ZH, JA, KO, AR ajoutées en plus de TR/EN), pas seulement en turc/anglais
- **Actions de rapport MusicDNA** — les résultats d'analyse incluent désormais des boutons « Ouvrir le rapport » et « Afficher dans le Finder » pour accéder directement aux fichiers `.dna.md` / `.report.plist` générés
- **Télémétrie — intégration Supabase :** tous les événements de télémétrie transitent désormais par `telemetry_events` avec des requêtes authentifiées, une logique de nouvelle tentative et un vidage synchrone à la fermeture
- **Suivi énergétique — basé sur IOKit :** mesures réelles en joules CPU+GPU+ANE via `powermetrics`, affichées en direct dans l'indicateur d'effort de la barre de menus
- **Analytique activée par défaut :** l'analytique est désormais activée par défaut lorsqu'aucune préférence explicite n'est définie

### Corrigé
- **Perte de contexte après une question de clarification** — répondre à la question de suivi de l'agent (par ex. « quel format de date ? ») pouvait auparavant faire dévier la conversation vers des résultats sans rapport (une correspondance partielle erronée de « ram » aiguillait mal ces réponses) ; l'agent reste désormais sur la tâche d'origine après votre réponse
- **Réponses de rappel personnel plus rapides** — élimination d'un tour de raisonnement inutile lorsque l'agent recherche quelque chose que vous lui avez déjà dit
- Lecture Apple Music et contrôle du volume : la confirmation reflète désormais l'état réel du lecteur, corrigeant des échecs silencieux lorsque Music n'était pas déjà en cours d'exécution
- Télémétrie : les métriques RAM/inférence et l'authentification ne signalent plus de valeurs obsolètes ou nulles ; les lots analytiques échoués n'échouent plus silencieusement
- Les builds de débogage sont désormais signés avec la bonne équipe de développement, corrigeant des droits (entitlements) manquants

## [1.0.2] - 2026-06-03

### Ajouté
- **Traitement des tâches en arrière-plan** — démarrez une nouvelle conversation pendant qu'une tâche est encore en cours ; l'ancienne conversation reste dans la barre latérale avec un indicateur ⟳ et continue en arrière-plan
- **Interruption de tâche** — Le bouton Arrêter (et la touche Échap) annule une tâche en cours d'exécution
- **Model Hub** — catalogue complet de modèles : plus de 30 modèles MLX locaux (Qwen3, Llama 4, Gemma 3/4, Mistral, Devstral, Phi-4, DeepSeek) dans une grille à 3 colonnes ; affichage adapté au matériel
- Prise en charge **VLM (Vision)** étendue : ajout de Qwen2.5-VL 7B pour les systèmes de 48 Go et plus
- Section de documentation **Aide → Catalogue de modèles** avec listes complètes de fichiers et exigences RAM
- **Lien profond de licence** — schéma d'URL `pheron://activate?key=...` pour une activation en un clic
- Qwen3 Dense : 0,6B · 1,7B · 4B · 8B · 14B · 32B
- Qwen3 MoE : 30B-A3B · Coder-30B-A3B · Next-80B-A3B · 235B-A22B · Coder-480B-A35B
- Llama 4 Maverick (512 Go)
- Mistral Small 3.2 24B · Devstral Small 24B · Mistral Large 123B · Devstral 2 123B
- DeepSeek V4 Flash (192 Go)
- VLM : Qwen2.5-VL 7B (48 Go+)

### Modifié
- Les titres de session utilisent désormais le premier message au lieu du nom du modèle
- La section VLM du Model Hub est affichée séparément
- L'onglet Réglages → IA contient désormais la section Configuration
- Améliorations de fiabilité de WebSearchTool

### Corrigé
- La fenêtre d'activation de licence se recrée désormais correctement lorsqu'elle est ouverte avec une clé préremplie

## [1.0.1] - 2026-06-01

### Modifié
- RAM minimale mise à jour à 16 Go dans toute la documentation et l'Info.plist

### Corrigé
- Affichage de l'Apple ID de relais privé dans le panneau de profil (affiche « Compte Apple » + logo Apple)
- Redimensionnement de la fenêtre Réglages pour les onglets Profil et Analytique
- Élément Politique de remboursement manquant dans le menu Aide
- Chemin du bundle d'aide intégré à l'application (les documents ne se chargeaient pas)
- Chemins de navigation de l'interface de documentation corrigés partout

## [1.0.0] - 2026-06-01
Version publique

### Ajouté
- Connexion avec Apple via l'authentification Supabase
- Activation de licence via Lemon Squeezy

### Corrigé
- La fenêtre Réglages se redimensionne désormais automatiquement selon le contenu de l'onglet
- Correction du dimensionnement de la fenêtre de l'onglet Analytique (chargement de données asynchrone)
- Correction du dimensionnement de la fenêtre du panneau de profil
