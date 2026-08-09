# Notas de atualização

Todas as alterações notáveis deste projeto são documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-08-01

### Adicionado
- **Integração com Lark Suite** — Conecta o servidor MCP oficial do Lark/Feishu para mensagens, chats, calendário, Base, documentos e tarefas por meio de uma conexão do tipo "traga seu próprio app".
- **Integração com LemonSqueezy** — Ponte REST direta para gerenciar pedidos, clientes, assinaturas, descontos e chaves de licença.
- **Integração com Kit (ConvertKit)** — Ponte REST direta para gerenciar assinantes, transmissões, sequências e tags.
- **Suporte a desconexão no MCP Hub** — Cada serviço conectado agora tem uma forma de um clique para limpar suas credenciais e se desconectar.
- **Integração com Audacity** — Controle uma instância em execução do Audacity diretamente por meio de seu próprio protocolo de script para edição de áudio e efeitos.
- **Notas, Lembretes da Apple e exportação para Office** — Suporte nativo a Notas/Lembretes, exportação real para Excel/PowerPoint/Word a partir de Numbers/Keynote/Pages, e remoção de fundo no dispositivo.

### Corrigido
- **Confiabilidade de busca na web e citações** — Corrigido um conjunto de problemas em respostas de pesquisa, incluindo resultados de busca perdidos, rejeições falsas de "resposta incompleta" e citações marcadas incorretamente.
- **Descoberta de novas ferramentas** — Notas, Lembretes, remoção de fundo e as ferramentas de documentos do Office agora são corretamente acessíveis em solicitações simples.
- **Conclusão de tarefas em várias etapas** — Corrigidos casos em que o agente podia descrever uma próxima etapa sem executá-la, ou marcar um relatório como concluído sem tê-lo escrito.
- **Confiabilidade de memória e lembrança** — Solicitações do tipo "lembre-se disso" agora são salvas de forma confiável em vez de silenciosamente não fazer nada.
- **Lógica de nova tentativa de ferramenta mais segura** — Uma ferramenta desativada após falhas repetidas agora se recupera automaticamente, e restrições permanentes são reportadas imediatamente em vez de tentadas novamente.
- **Precisão de datas do calendário** — Corrigido um bug em que eventos podiam ser salvos silenciosamente com uma data incorreta.
- **Correções de integração com Stripe e Git** — Corrigido o conjunto de ações do Stripe após uma mudança anterior e estabilizada a integração com Git MCP.
- **Segurança em operações de arquivos e pastas** — Corrigidos casos extremos em verificações de permissão de caminho e comportamento de mover/copiar pastas.
- **Confiabilidade geral** — Pequenas correções na entrega de telemetria, automação do navegador, orçamentos de tempo limite e detecção de carga do sistema.

## [1.0.5] - 2026-07-24

### Corrigido
- **Segurança na citação de fontes** — Corrigido um problema em que o agente podia citar URLs de origem, datas ou números de versão inexistentes, movendo as verificações de segurança de citação para o caminho de execução ativo.
- **Execução de solicitações compostas** — Corrigido um problema em que solicitações compostas de várias partes (ex.: pedir telemetria e versão do sistema operacional juntas) podiam retornar apenas metade da resposta, forçando as chamadas de ferramenta ausentes.
- **Segurança no redirecionamento de saída do shell** — Impedido que redirecionamentos simples de shell para um único arquivo (`command > file`) contornassem a proteção binária e as verificações de segurança de escrita.
- **Detecção de bots e filtragem de CAPTCHA** — A busca na web agora detecta e filtra páginas de CAPTCHA/desafio de bot dos mecanismos de busca para evitar que o raciocínio seja afetado pelo texto do desafio.
- **Estabilização de JS na busca do Google** — Melhorada a obtenção de resultados de busca do Google aguardando a conclusão da renderização de JavaScript do lado do cliente.
- **Resiliência do fallback do Safari** — Abre genuinamente abas visíveis do Safari para o fallback de busca, com orientação clara de permissão quando necessário.
- **Concorrência biométrica e do Keychain** — Corrigido o tratamento de tempo limite do Touch ID e desbloqueadas as leituras de Keychain em segundo plano que bloqueavam as verificações de disponibilidade de ferramentas.
- **Limites de nova tentativa do daemon** — Impedido que conexões de daemon em segundo plano com falha tentassem novamente indefinidamente.

### Adicionado
- **Pesquisa de fontes confiáveis** — O agente agora prioriza dados oficiais do projeto, especificações estruturadas e documentação direta em vez de trechos de busca de terceiros.
- **Conjuntos de ferramentas do GitHub expandidos** — Adicionado acesso a GitHub Actions, segurança de código, Dependabot, discussões, avisos, gists, projetos, etiquetas e notificações.

## [1.0.4] - 2026-07-06

### Adicionado
- **Pontes de ferramentas MCP** — O Pheron Agent agora se integra com servidores externos de Model Context Protocol (MCP), incluindo Git, automação de navegador Playwright, busca na web Perplexity, Stripe, GitHub, Notion, Unreal Engine e Zapier.
- **MCP Hub e Conexões** — Adicionado um assistente dedicado em grade de cartões em Configurações > Conexões para configurar, salvar e testar facilmente credenciais de conexões com ferramentas externas.
- **Recomendações sensíveis ao contexto** — O agente agora sugere conectar integrações ausentes em Configurações > Conexões quando uma tarefa requer uma ferramenta protegida por credenciais.
- **Raciocínio unificado de tela e acessibilidade** — Encadeadas descrições de captura de tela, OCR e análise da árvore de acessibilidade (AX) para ações mais coerentes e confiáveis relacionadas a navegador/tela.
- **Perfil de usuário local** — Preferências descobertas pelo agente e informações de identidade do usuário agora são salvas em um perfil Markdown legível (`UserProfile.md`).
- **Redesenho da aba de desempenho** — Combinadas as abas Saúde e Análise em Configurações em uma única aba com gráficos de tendência em tempo real de uso de CPU, memória e velocidade.
- **Suporte à telemetria de disco** — Os relatórios de telemetria agora incluem o espaço livre do volume de inicialização além das estatísticas de CPU e memória.

### Corrigido
- **Contexto de conversa em múltiplos turnos** — Corrigida a perda de contexto entre turnos consecutivos no mesmo fio de conversa, garantindo que o agente lembre o contexto imediato.
- **Limites de contexto do modelo** — Corrigidos problemas de escalonamento do orçamento de contexto do modelo local que restringiam artificialmente as janelas de tokens utilizáveis em sistemas com mais RAM.
- **Correções de loop de memória** — Resolvido um gatilho de loop de chamada de ferramenta ao buscar detalhes de lembrança do usuário (ex.: "você lembra meu nome?").
- **Estabilidade do Keychain e autenticação** — Corrigidos os retornos de fluxo OAuth para Notion/Zapier e restauradas entradas de Keychain excluídas durante execuções de teste locais.
- **Desempenho na troca de tarefas** — Processos em segundo plano e execuções de comandos são interrompidos imediatamente no tempo limite ou cancelamento de tarefa, para evitar vazamentos de CPU.
- **Roteamento de preposições de comando em turco** — Corrigido um bug de roteamento incorreto em que comandos em turco contendo "üzerinden" (via) eram enviados incorretamente para o caminho de matemática/cálculo.

## [1.0.3] - 2026-06-19

### Adicionado
- **Memória pessoal e lembrança** — o agente agora lembra e apresenta de forma confiável fatos que você compartilhou explicitamente (histórico, currículo, preferências) quando você pergunta sobre eles; fechada uma lacuna profunda de recuperação em que fatos salvos podiam se tornar efetivamente impossíveis de buscar
- **Comandos de arquivo/pasta multilíngues** — solicitações do tipo "organize esta pasta" agora são reconhecidas em 13 idiomas (adicionados ES, FR, DE, PT, IT, RU, ZH, JA, KO, AR além de TR/EN), não apenas turco/inglês
- **Ações de relatório do MusicDNA** — os resultados da análise agora incluem botões "Abrir relatório" e "Mostrar no Finder" para ir diretamente aos arquivos `.dna.md` / `.report.plist` gerados
- **Telemetria — integração com Supabase:** todos os eventos de telemetria agora fluem por `telemetry_events` com solicitações autenticadas, lógica de nova tentativa e descarga síncrona ao sair
- **Rastreamento de energia — baseado em IOKit:** medições reais de joules de CPU+GPU+ANE via `powermetrics`, exibidas ao vivo no indicador de esforço da barra de menus
- **Análise ativada por padrão:** a análise agora é habilitada por padrão quando nenhuma preferência explícita é definida

### Corrigido
- **Perda de contexto após uma pergunta de esclarecimento** — responder à pergunta de acompanhamento do agente (ex.: "qual formato de data?") antes podia desviar a conversa para resultados não relacionados (uma correspondência parcial equivocada de "ram" desviava essas respostas); o agente agora permanece na tarefa original após você responder
- **Respostas de lembrança pessoal mais rápidas** — eliminado um turno de raciocínio desperdiçado quando o agente busca algo que você disse a ele anteriormente
- Reprodução do Apple Music e controle de volume: a confirmação agora reflete o estado real do reprodutor, corrigindo falhas silenciosas quando o Music ainda não estava em execução
- Telemetria: métricas de RAM/inferência e autenticação não reportam mais valores obsoletos ou zerados; lotes de análise com falha não falham mais silenciosamente
- Compilações de depuração agora são assinadas com a equipe de desenvolvimento correta, corrigindo direitos (entitlements) ausentes

## [1.0.2] - 2026-06-03

### Adicionado
- **Processamento de tarefas em segundo plano** — inicie uma nova conversa enquanto uma tarefa ainda está em execução; a conversa antiga permanece na barra lateral com um indicador ⟳ e continua em segundo plano
- **Interrupção de tarefa** — O botão Parar (e a tecla Esc) cancela uma tarefa em execução no meio da execução
- **Model Hub** — catálogo completo de modelos: mais de 30 modelos MLX locais (Qwen3, Llama 4, Gemma 3/4, Mistral, Devstral, Phi-4, DeepSeek) em uma grade de 3 colunas; exibição adaptável ao hardware
- Suporte a **VLM (Visão)** expandido: adicionado Qwen2.5-VL 7B para sistemas com 48 GB ou mais
- Seção de documentação **Ajuda → Catálogo de modelos** com listas completas de arquivos e requisitos de RAM
- **Link direto de licença** — esquema de URL `pheron://activate?key=...` para ativação em um clique
- Qwen3 Dense: 0,6B · 1,7B · 4B · 8B · 14B · 32B
- Qwen3 MoE: 30B-A3B · Coder-30B-A3B · Next-80B-A3B · 235B-A22B · Coder-480B-A35B
- Llama 4 Maverick (512 GB)
- Mistral Small 3.2 24B · Devstral Small 24B · Mistral Large 123B · Devstral 2 123B
- DeepSeek V4 Flash (192 GB)
- VLM: Qwen2.5-VL 7B (48 GB+)

### Alterado
- Os títulos de sessão agora usam a primeira mensagem em vez do nome do modelo
- A seção VLM do Model Hub é exibida separadamente
- A aba Configurações → IA agora contém a seção de Configuração
- Melhorias de confiabilidade no WebSearchTool

### Corrigido
- A janela de ativação de licença agora é recriada corretamente quando aberta com uma chave pré-preenchida

## [1.0.1] - 2026-06-01

### Alterado
- RAM mínima atualizada para 16 GB em toda a documentação e no Info.plist

### Corrigido
- Exibição do Apple ID de retransmissão privada no painel de perfil (mostra "Conta Apple" + logotipo da Apple)
- Redimensionamento da janela de Configurações para as abas Perfil e Análise
- Item de Política de Reembolso ausente no menu Ajuda
- Caminho do pacote de Ajuda no aplicativo (documentos não carregavam)
- Caminhos de navegação da interface de documentação corrigidos em todo o sistema

## [1.0.0] - 2026-06-01
Lançamento público

### Adicionado
- Entrar com Apple usando autenticação Supabase
- Ativação de licença via Lemon Squeezy

### Corrigido
- A janela de Configurações agora se redimensiona automaticamente conforme o conteúdo da aba
- Correção do dimensionamento da janela da aba Análise (carregamento assíncrono de dados)
- Correção do dimensionamento da janela do painel de perfil
