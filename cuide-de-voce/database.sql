-- ═══════════════════════════════════════════════════════════
-- BANCO DE DADOS: cuide_de_voce
-- Sistema de Saúde Mental e Autocuidado
-- ═══════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS cuide_de_voce
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cuide_de_voce;

-- ─── TABELA: usuario ────────────────────────────────────────
DROP TABLE IF EXISTS resposta;
DROP TABLE IF EXISTS resultado;
DROP TABLE IF EXISTS sessao;
DROP TABLE IF EXISTS opcao;
DROP TABLE IF EXISTS pergunta;
DROP TABLE IF EXISTS artigo;
DROP TABLE IF EXISTS dica;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
  id_usuario   INT(11)      NOT NULL AUTO_INCREMENT,
  nome         VARCHAR(120) NOT NULL,
  email        VARCHAR(180) NOT NULL,
  senha        VARCHAR(255) NOT NULL,
  criado_em    DATETIME     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: artigo ─────────────────────────────────────────
CREATE TABLE artigo (
  id_artigo     INT(11)      NOT NULL AUTO_INCREMENT,
  tag           VARCHAR(60)  NOT NULL,
  titulo        VARCHAR(200) NOT NULL,
  resumo        TEXT         DEFAULT NULL,
  tempo_leitura VARCHAR(30)  DEFAULT NULL,
  conteudo      TEXT         DEFAULT NULL,
  criado_em     DATETIME     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_artigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: dica ───────────────────────────────────────────
CREATE TABLE dica (
  id_dica  INT(11)      NOT NULL AUTO_INCREMENT,
  titulo   VARCHAR(120) NOT NULL,
  texto    TEXT         NOT NULL,
  PRIMARY KEY (id_dica)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: pergunta ───────────────────────────────────────
CREATE TABLE pergunta (
  id_pergunta INT(11)    NOT NULL AUTO_INCREMENT,
  texto       TEXT       NOT NULL,
  ordem       SMALLINT(6) NOT NULL,
  PRIMARY KEY (id_pergunta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: opcao ──────────────────────────────────────────
CREATE TABLE opcao (
  id_opcao    INT(11)      NOT NULL AUTO_INCREMENT,
  id_pergunta INT(11)      NOT NULL,
  texto       VARCHAR(200) NOT NULL,
  valor       INT(11)      NOT NULL,
  PRIMARY KEY (id_opcao),
  KEY fk_opcao_pergunta (id_pergunta),
  CONSTRAINT fk_opcao_pergunta FOREIGN KEY (id_pergunta) REFERENCES pergunta (id_pergunta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: sessao ─────────────────────────────────────────
CREATE TABLE sessao (
  id_sessao   INT(11)  NOT NULL AUTO_INCREMENT,
  id_usuario  INT(11)  NOT NULL,
  iniciada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_sessao),
  KEY fk_sessao_usuario (id_usuario),
  CONSTRAINT fk_sessao_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: resposta ───────────────────────────────────────
CREATE TABLE resposta (
  id_resposta INT(11) NOT NULL AUTO_INCREMENT,
  id_sessao   INT(11) NOT NULL,
  id_pergunta INT(11) NOT NULL,
  valor       INT(11) NOT NULL,
  PRIMARY KEY (id_resposta),
  KEY fk_resposta_sessao   (id_sessao),
  KEY fk_resposta_pergunta (id_pergunta),
  CONSTRAINT fk_resposta_sessao   FOREIGN KEY (id_sessao)   REFERENCES sessao   (id_sessao),
  CONSTRAINT fk_resposta_pergunta FOREIGN KEY (id_pergunta) REFERENCES pergunta (id_pergunta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TABELA: resultado ──────────────────────────────────────
CREATE TABLE resultado (
  id_resultado  INT(11)        NOT NULL AUTO_INCREMENT,
  id_sessao     INT(11)        NOT NULL,
  pontuacao     INT(11)        NOT NULL,
  pontuacao_max INT(11)        NOT NULL,
  percentual    DECIMAL(5,2)   NOT NULL,
  nivel         VARCHAR(20)    NOT NULL,
  titulo        VARCHAR(120)   NOT NULL,
  mensagem      TEXT           NOT NULL,
  gerado_em     DATETIME       DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_resultado),
  KEY fk_resultado_sessao (id_sessao),
  CONSTRAINT fk_resultado_sessao FOREIGN KEY (id_sessao) REFERENCES sessao (id_sessao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ═══════════════════════════════════════════════════════════
-- INSERTS — ARTIGOS
-- ═══════════════════════════════════════════════════════════
INSERT INTO artigo (tag, titulo, resumo, tempo_leitura, conteudo) VALUES
('Ansiedade', 'Como lidar com a ansiedade no dia a dia',
 'Estratégias práticas para reconhecer os gatilhos e criar rotinas de calma.',
 '5 min de leitura',
 '<h2>Como lidar com a ansiedade no dia a dia</h2><p>A ansiedade é uma resposta natural do organismo a situações de incerteza ou ameaça. No entanto, quando se torna frequente e intensa, pode afetar significativamente a qualidade de vida. Reconhecer os sinais precocemente é o primeiro passo.</p><h3>Identifique seus gatilhos</h3><p>Mantenha um diário simples por uma semana anotando os momentos em que a ansiedade surgiu, o que acontecia antes e como seu corpo reagiu. Esse mapeamento revela padrões que muitas vezes passam despercebidos.</p><h3>Técnicas de curto prazo</h3><ul><li>Respiração 4-7-8: inspire por 4 segundos, segure por 7, expire por 8.</li><li>Grounding 5-4-3-2-1: nomeie 5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que saboreia.</li><li>Caminhe por 10 minutos ao ar livre, sem celular.</li></ul><h3>Hábitos de longo prazo</h3><p>Sono regular, alimentação equilibrada e exercício físico são os três pilares mais eficazes contra a ansiedade crônica. Estabeleça horários fixos para dormir e acordar, mesmo nos fins de semana.</p><p>Se a ansiedade persistir ou prejudicar suas atividades diárias, converse com um profissional de saúde mental. Buscar ajuda é um ato de coragem e autocuidado.</p>'),

('Autoestima', 'Construindo uma relação mais gentil com você mesmo',
 'Aprenda a desafiar a autocrítica excessiva e cultivar compaixão interior.',
 '6 min de leitura',
 '<h2>Construindo uma relação mais gentil com você mesmo</h2><p>Você falaria com um amigo da mesma forma que fala consigo mesmo nos momentos difíceis? Para a maioria das pessoas, a resposta é não. A autocrítica excessiva é um dos maiores obstáculos ao bem-estar emocional.</p><h3>O que é autocompaixão?</h3><p>Autocompaixão não é autopiedade nem baixar a barra para si mesmo. É reconhecer que sofrer e cometer erros faz parte da experiência humana, e tratar a si mesmo com a mesma gentileza que ofereceria a alguém que você ama.</p><h3>Exercício prático: a carta gentil</h3><p>Escreva uma carta para si mesmo sobre uma situação difícil que está vivendo, como se fosse escrita por um amigo próximo e compassivo. Use tom de acolhimento, sem minimizar a dor nem exagerar no drama.</p><h3>Desafie pensamentos automáticos</h3><ul><li>Quando surgir um pensamento muito crítico, pergunte: "Isso é um fato ou uma interpretação?"</li><li>Procure evidências reais que contradigam a crítica.</li><li>Substitua "eu sempre erro" por "eu errei desta vez, o que posso aprender?"</li></ul><p>A autoestima saudável se constrói com consistência, não com perfeição. Celebre avanços pequenos.</p>'),

('Sono', 'Sono de qualidade: o aliado invisível da saúde mental',
 'Por que dormir bem transforma seu humor, foco e resiliência emocional.',
 '4 min de leitura',
 '<h2>Sono de qualidade: o aliado invisível da saúde mental</h2><p>Durante o sono, o cérebro consolida memórias, regula emoções e elimina toxinas. Privar-se de sono, mesmo que moderadamente, afeta diretamente o humor, a concentração e a tolerância ao estresse.</p><h3>Sinais de sono de baixa qualidade</h3><ul><li>Acordar cansado mesmo depois de 7–8 horas na cama.</li><li>Irritabilidade ou dificuldade de concentração ao longo do dia.</li><li>Dependência de cafeína para funcionar pela manhã.</li><li>Pensamentos acelerados na hora de dormir.</li></ul><h3>Higiene do sono: por onde começar</h3><p>Crie uma rotina de desaceleração de 30 minutos antes de dormir: reduza luzes, evite telas, faça algo tranquilo como ler ou ouvir música calma. Tente dormir e acordar sempre nos mesmos horários.</p><p>O quarto deve ser escuro, silencioso e fresco. Temperaturas em torno de 18–20°C favorecem o sono profundo.</p><h3>Mente acelerada à noite</h3><p>Anote preocupações num papel antes de dormir para "descarregar" a mente. Exercícios de respiração são ferramentas poderosas para desacelerar o sistema nervoso.</p>'),

('Relações', 'Como comunicar sentimentos sem gerar conflito',
 'Comunicação não-violenta: uma ferramenta para conexões mais saudáveis.',
 '7 min de leitura',
 '<h2>Como comunicar sentimentos sem gerar conflito</h2><p>Muitos conflitos não nascem de diferenças irreconciliáveis, mas de formas inadequadas de expressar necessidades e sentimentos. A Comunicação Não-Violenta (CNV), desenvolvida pelo psicólogo Marshall Rosenberg, oferece um caminho diferente.</p><h3>Os 4 passos da CNV</h3><ul><li><strong>Observação:</strong> descreva o fato sem julgamento.</li><li><strong>Sentimento:</strong> expresse como você se sentiu.</li><li><strong>Necessidade:</strong> identifique a necessidade por trás do sentimento.</li><li><strong>Pedido:</strong> faça um pedido claro e realizável.</li></ul><h3>O que evitar</h3><p>Evite linguagem de acusação, interpretações apresentadas como fatos, e comparações. Fale de si, não sobre o outro.</p><p>A prática da CNV exige paciência — com você e com os outros. Comece aplicando em situações de baixo conflito antes de tentar em conversas difíceis.</p>');

-- ═══════════════════════════════════════════════════════════
-- INSERTS — DICAS
-- ═══════════════════════════════════════════════════════════
INSERT INTO dica (titulo, texto) VALUES
('Movimento diário', '30 minutos de caminhada, dança ou qualquer atividade que você goste. Não precisa ser intensa — o importante é mover o corpo todos os dias. O movimento libera endorfinas e reduz o cortisol.'),
('Desconexão digital consciente', 'Estabeleça pelo menos 1 hora por dia sem celular ou telas. Use esse tempo para uma atividade analógica: cozinhar, ler, caminhar, conversar. A sobrecarga digital é um dos maiores gatilhos de ansiedade moderna.'),
('Hidratação e alimentação', 'Beba ao menos 2 litros de água por dia. Reduza açúcar refinado e ultraprocessados, que estão associados a oscilações de humor. Refeições regulares mantêm os níveis de energia estáveis.'),
('Gratidão e registro', 'Antes de dormir, anote 3 coisas boas que aconteceram no dia — por menores que sejam. Essa prática treina o cérebro a perceber o positivo ao longo do tempo, contrapondo o viés natural de negatividade.'),
('Limites saudáveis', 'Aprender a dizer não é um ato de autocuidado. Identifique compromissos que drenam sua energia sem trazer valor real e comece a recusá-los com gentileza. Seus limites protegem sua saúde.'),
('Conexão social de qualidade', 'Reserve tempo semanal para pessoas com quem você se sente seguro e bem. Relacionamentos de qualidade são um dos fatores mais consistentes de bem-estar e longevidade mental.');

-- ═══════════════════════════════════════════════════════════
-- INSERTS — PERGUNTAS E OPÇÕES (30 perguntas)
-- ═══════════════════════════════════════════════════════════
INSERT INTO pergunta (texto, ordem) VALUES
-- Ansiedade e nervosismo (1-4)
('Com que frequência você se sentiu nervoso ou ansioso nos últimos 7 dias?', 1),
('Você teve sensações físicas de ansiedade (coração acelerado, falta de ar, tensão muscular)?', 2),
('Você se preocupou excessivamente com situações do dia a dia?', 3),
('Você evitou situações ou pessoas por causa do medo ou ansiedade?', 4),
-- Humor e emoções (5-8)
('Com que frequência você se sentiu triste ou sem esperança?', 5),
('Você teve dificuldade em sentir prazer em atividades que normalmente gosta?', 6),
('Você se sentiu irritado ou impaciente com mais facilidade do que o normal?', 7),
('Você experimentou mudanças bruscas de humor ao longo do dia?', 8),
-- Sono (9-11)
('Como avalia a qualidade do seu sono na última semana?', 9),
('Você teve dificuldade para adormecer ou acordou durante a noite?', 10),
('Você acordou se sentindo descansado e com energia?', 11),
-- Energia e motivação (12-14)
('Como esteve seu nível de energia geral esta semana?', 12),
('Você se sentiu motivado para cumprir suas responsabilidades diárias?', 13),
('Você se sentiu mentalmente sobrecarregado ou esgotado?', 14),
-- Concentração e cognição (15-17)
('Você teve dificuldade de concentração ou foco?', 15),
('Você se esqueceu de coisas importantes ou sentiu sua memória falhar?', 16),
('Você conseguiu tomar decisões com clareza?', 17),
-- Autocuidado e hábitos (18-20)
('Como esteve sua alimentação esta semana?', 18),
('Você praticou alguma atividade física esta semana?', 19),
('Você teve tempo para atividades de lazer e descanso?', 20),
-- Relações sociais (21-23)
('Como está sua relação com as pessoas ao seu redor?', 21),
('Você se sentiu sozinho ou isolado socialmente?', 22),
('Você conseguiu pedir ajuda quando precisou?', 23),
-- Autoestima e identidade (24-26)
('Como está sua autoestima e confiança em si mesmo?', 24),
('Você teve pensamentos muito críticos sobre si mesmo?', 25),
('Você se sentiu valorizado pelas pessoas ao seu redor?', 26),
-- Estresse e trabalho (27-29)
('Como esteve seu nível de estresse relacionado ao trabalho ou estudos?', 27),
('Você conseguiu equilibrar suas obrigações com seu bem-estar pessoal?', 28),
('Você se sentiu no controle da sua vida e rotina?', 29),
-- Perspectiva geral (30)
('De maneira geral, como você avalia seu bem-estar emocional esta semana?', 30);

-- OPÇÕES para cada pergunta (4 opções por pergunta, valores 0, 1, 2, 3)
-- Pergunta 1
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(1,'Raramente ou nunca',0),(1,'Alguns dias',1),(1,'Com frequência',2),(1,'Quase todos os dias',3);
-- Pergunta 2
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(2,'Não tive',0),(2,'Uma ou duas vezes',1),(2,'Algumas vezes',2),(2,'Frequentemente',3);
-- Pergunta 3
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(3,'Não me preocupei',0),(3,'Pouco',1),(3,'Moderadamente',2),(3,'Muito',3);
-- Pergunta 4
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(4,'Não evitei',0),(4,'Raramente',1),(4,'Algumas vezes',2),(4,'Frequentemente',3);
-- Pergunta 5
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(5,'Raramente ou nunca',0),(5,'Alguns dias',1),(5,'Com frequência',2),(5,'Quase todos os dias',3);
-- Pergunta 6
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(6,'Nenhuma dificuldade',0),(6,'Pouca dificuldade',1),(6,'Dificuldade moderada',2),(6,'Muita dificuldade',3);
-- Pergunta 7
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(7,'Não',0),(7,'Raramente',1),(7,'Às vezes',2),(7,'Com frequência',3);
-- Pergunta 8
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(8,'Não',0),(8,'Raramente',1),(8,'Às vezes',2),(8,'Frequentemente',3);
-- Pergunta 9
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(9,'Excelente',0),(9,'Boa',1),(9,'Regular',2),(9,'Ruim',3);
-- Pergunta 10
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(10,'Não tive',0),(10,'Raramente',1),(10,'Algumas noites',2),(10,'A maioria das noites',3);
-- Pergunta 11
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(11,'Sim, sempre',0),(11,'Geralmente sim',1),(11,'Raramente',2),(11,'Não, nunca',3);
-- Pergunta 12
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(12,'Muito bom',0),(12,'Bom',1),(12,'Baixo',2),(12,'Muito baixo',3);
-- Pergunta 13
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(13,'Muito motivado',0),(13,'Moderadamente motivado',1),(13,'Pouco motivado',2),(13,'Sem motivação',3);
-- Pergunta 14
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(14,'Não me senti',0),(14,'Levemente',1),(14,'Moderadamente',2),(14,'Muito sobrecarregado',3);
-- Pergunta 15
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(15,'Nenhuma dificuldade',0),(15,'Leve dificuldade',1),(15,'Dificuldade moderada',2),(15,'Muita dificuldade',3);
-- Pergunta 16
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(16,'Não',0),(16,'Raramente',1),(16,'Algumas vezes',2),(16,'Com frequência',3);
-- Pergunta 17
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(17,'Com muita clareza',0),(17,'Com alguma clareza',1),(17,'Com dificuldade',2),(17,'Não consegui',3);
-- Pergunta 18
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(18,'Muito saudável',0),(18,'Razoavelmente saudável',1),(18,'Irregular',2),(18,'Muito irregular',3);
-- Pergunta 19
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(19,'Sim, regularmente',0),(19,'Às vezes',1),(19,'Pouco',2),(19,'Não pratiquei',3);
-- Pergunta 20
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(20,'Sim, bastante',0),(20,'Algum tempo',1),(20,'Pouco tempo',2),(20,'Nenhum tempo',3);
-- Pergunta 21
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(21,'Muito bem',0),(21,'Bem',1),(21,'Com dificuldades',2),(21,'Muito mal',3);
-- Pergunta 22
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(22,'Não me senti',0),(22,'Raramente',1),(22,'Algumas vezes',2),(22,'Com frequência',3);
-- Pergunta 23
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(23,'Sim, facilmente',0),(23,'Com alguma dificuldade',1),(23,'Com muita dificuldade',2),(23,'Não consegui',3);
-- Pergunta 24
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(24,'Muito boa',0),(24,'Boa',1),(24,'Baixa',2),(24,'Muito baixa',3);
-- Pergunta 25
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(25,'Não tive',0),(25,'Raramente',1),(25,'Algumas vezes',2),(25,'Com frequência',3);
-- Pergunta 26
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(26,'Sim, muito',0),(26,'Às vezes',1),(26,'Raramente',2),(26,'Não me senti',3);
-- Pergunta 27
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(27,'Muito baixo',0),(27,'Moderado',1),(27,'Alto',2),(27,'Muito alto',3);
-- Pergunta 28
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(28,'Sim, muito bem',0),(28,'Razoavelmente',1),(28,'Com dificuldade',2),(28,'Não consegui',3);
-- Pergunta 29
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(29,'Sim, totalmente',0),(29,'Parcialmente',1),(29,'Pouco',2),(29,'Não me senti no controle',3);
-- Pergunta 30
INSERT INTO opcao (id_pergunta, texto, valor) VALUES
(30,'Muito bem',0),(30,'Bem',1),(30,'Regular',2),(30,'Mal',3);
