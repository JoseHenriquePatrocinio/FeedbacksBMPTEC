const { Document, Packer, Paragraph, TextRun } = require('docx');
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');

function gerarQuestionario(respostas) {
  const nomeParticipante = respostas.nome || "Participante Anônimo";
  
  const funcao = respostas.funcao;
  const senioridade = respostas.senioridade;
  const nivel = respostas.nivel;
  const cargo = funcao + " " + senioridade + " " + nivel;
  const squad = respostas.squad || "Squad não especificado";
  const dataFeedback = format(new Date(), 'dd-MM-yyyy');
  const dataImpressa = format(new Date(), 'dd/MM/yyyy HH:mm');
  const dataContratacao = format(respostas.dataContratacao, 'dd/MM/yyyy');

  const baseDir = path.join(__dirname, 'arquivos');
  
  const squadDir = path.join(baseDir, squad);
  if (!fs.existsSync(squadDir)) {
    fs.mkdirSync(squadDir, { recursive: true });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment:'center',
            children: [
              new TextRun({
                text: "Relatório de Feedback 360: " + nomeParticipante,
                bold: true,
                size: 42,
              }),
            ],
          }),
          new Paragraph(""),
          new Paragraph({
            alignment:'center',
            size: 36,
            children: [
              new TextRun({
                text: "| Cargo: " + cargo + " | " + "Squad: " + squad + " | Inicio: " + dataContratacao + " |",
                bold: true,
              }),
              new TextRun({
                text: " Data avaliação: " + dataImpressa,
                bold: true,
              }),
            ],
          }),
          new Paragraph(""),

          // Tópico 1 - Autoconhecimento e Identidade Profissional
          new Paragraph({
            children: [new TextRun({ text: "1. Autoconhecimento e Identidade Profissional", bold: true })],
          }),
          new Paragraph("   - O que você acredita que o diferencia como profissional dentro da equipe?"),
          new Paragraph("     R: " + respostas.autoconhecimento_1),
          new Paragraph(""),
          new Paragraph("   - Quais aspectos do seu trabalho lhe trazem mais satisfação e motivação?"),
          new Paragraph("     R: " + respostas.autoconhecimento_2),
          new Paragraph(""),
          new Paragraph("   - Como você acha que seus colegas e gestores descreveriam sua atuação profissional?"),
          new Paragraph("     R: " + respostas.autoconhecimento_3),
          new Paragraph(""),

          // Tópico 2 - Habilidades e Conhecimento Técnico
          new Paragraph({
            children: [new TextRun({ text: "2. Habilidades e Conhecimento Técnico", bold: true })],
          }),
          new Paragraph("   - Quais são as habilidades técnicas que você mais confia ao executar seu trabalho?"),
          new Paragraph("     R: " + respostas.habilidades_1),
          new Paragraph(""),
          new Paragraph("   - Existe alguma área técnica em que você sente que poderia melhorar? Se sim, como isso impacta seu desempenho?"),
          new Paragraph("     R: " + respostas.habilidades_2),
          new Paragraph(""),
          new Paragraph("   - Você sente que acompanha bem as mudanças e tendências tecnológicas do seu setor?"),
          new Paragraph("     R: " + respostas.habilidades_3),
          new Paragraph(""),

          // Tópico 3 - Trabalho em Equipe e Colaboração
          new Paragraph({
            children: [new TextRun({ text: "3. Trabalho em Equipe e Colaboração", bold: true })],
          }),
          new Paragraph("   - Como você se percebe em relação à colaboração com seus colegas? Você sente que contribui ativamente para o time?"),
          new Paragraph("     R: " + respostas.colaboracao_1),
          new Paragraph(""),
          new Paragraph("   - Você acredita que sua presença impacta positivamente a dinâmica da equipe? Por quê?"),
          new Paragraph("     R: " + respostas.colaboracao_2),
          new Paragraph(""),
          new Paragraph("   - Como você lida com opiniões e abordagens diferentes das suas dentro da equipe?"),
          new Paragraph("     R: " + respostas.colaboracao_3),
          new Paragraph(""),

          // Tópico 4 - Comunicação e Relacionamento
          new Paragraph({
            children: [new TextRun({ text: "4. Comunicação e Relacionamento", bold: true })],
          }),
          new Paragraph("   - Você sente que sua comunicação é clara e bem compreendida pelos outros?"),
          new Paragraph("     R: " + respostas.comunicacao_1),
          new Paragraph(""),
          new Paragraph("   - Como você reage quando recebe feedback construtivo? Você consegue absorvê-lo de forma positiva?"),
          new Paragraph("     R: " + respostas.comunicacao_2),
          new Paragraph(""),
          new Paragraph("   - Você acha que consegue expressar suas ideias e preocupações de maneira assertiva?"),
          new Paragraph("     R: " + respostas.comunicacao_3),
          new Paragraph(""),

          // Tópico 5 - Resolução de Problemas e Tomada de Decisão
          new Paragraph({
            children: [new TextRun({ text: "5. Resolução de Problemas e Tomada de Decisão", bold: true })],
          }),
          new Paragraph("   - Você se considera alguém que antecipa problemas ou que responde bem quando eles surgem?"),
          new Paragraph("     R: " + respostas.resolucao_1),
          new Paragraph(""),
          new Paragraph("   - Como você se sente ao tomar decisões que impactam outras pessoas ou o projeto?"),
          new Paragraph("     R: " + respostas.resolucao_2),
          new Paragraph(""),
          new Paragraph("   - Há algum momento recente em que você teve que resolver um problema desafiador? Como você lidou com isso?"),
          new Paragraph("     R: " + respostas.resolucao_3),
          new Paragraph(""),

          // Tópico 6 - Motivação e Propósito
          new Paragraph({
            children: [new TextRun({ text: "6. Motivação e Propósito", bold: true })],
          }),
          new Paragraph("   - O que mais o motiva a continuar crescendo profissionalmente?"),
          new Paragraph("     R: " + respostas.motivacao_1),
          new Paragraph(""),
          new Paragraph("   - Há algo que você sente que perdeu ou deixou de lado em sua trajetória profissional? Como isso afeta sua visão sobre o futuro?"),
          new Paragraph("     R: " + respostas.motivacao_2),
          new Paragraph(""),
          new Paragraph("   - Se pudesse mudar algum aspecto do seu trabalho ou rotina profissional, o que seria e por quê?"),
          new Paragraph("     R: " + respostas.motivacao_3),
          new Paragraph(""),

          // Tópico 7 - Reflexão Final
          new Paragraph({
            children: [new TextRun({ text: "7. Reflexão Final", bold: true })],
          }),
          new Paragraph("   - Se você pudesse dar um conselho profissional para si mesmo há um ano, qual seria?"),
          new Paragraph("     R: " + respostas.reflexao_1),
          new Paragraph(""),
          new Paragraph("   - Como você gostaria de ser lembrado pelos colegas e gestores com quem trabalha atualmente?"),
          new Paragraph("     R: " + respostas.reflexao_2),
          new Paragraph(""),
          new Paragraph("   - Existe algo que gostaria de compartilhar sobre sua experiência profissional que não foi abordado nas perguntas anteriores?"),
          new Paragraph("     R: " + respostas.reflexao_3),
          new Paragraph(""),

          // Tópico 8 - Feedback Tech lead
          new Paragraph({
            children: [new TextRun({ text: "8. Feedback 360° - Tech lead", bold: true })],
          }),
          new Paragraph("   - Do seu ponto de vista, como você descreveria o desempenho geral dessa pessoa? Quais os pontos fortes dessa pessoa? E quais os pontos de atenção?"),
          new Paragraph("     R: " + respostas.leader_1),
          new Paragraph(""),
          new Paragraph("   - Quais habilidades foram aprimoradas desde a última avaliação, ou quais você vê potencial?"),
          new Paragraph("     R: " + respostas.leader_2),
          new Paragraph(""),
          new Paragraph("   - Quais conselho ou dica você daria para ajudar esse colaborador a melhorar seus resultados e seu impacto dentro da equipe?"),
          new Paragraph("     R: " + respostas.leader_3),
          new Paragraph(""),

          // Tópico 9 - Feedback Gestão
          new Paragraph({
            children: [new TextRun({ text: "9. Feedback 360° - Gestão", bold: true })],
          }),
          new Paragraph("   - Quais são os comportamentos desse colaborador que você acha que mais contribuem para a dinâmica da equipe?"),
          new Paragraph("     R: " + respostas.gestao_1),
          new Paragraph(""),
          new Paragraph("   - Quais são as suas expectativas em relação ao desempenho desse colaborador? Elas tem sido atendidas? Algum comportamento que necessita atenção?"),
          new Paragraph("     R: " + respostas.gestao_2),
          new Paragraph(""),
          new Paragraph("   - Alguma das questões levantadas pelo colaborador nas perguntas anteriores que você gostaria de responder, ou explicar??"),
          new Paragraph("     R: " + respostas.gestao_3),
          new Paragraph(""),

          // Tópico 10 - Replica  do Colaborador
          new Paragraph({
            children: [new TextRun({ text: "10. Feedback 360° - Réplica Colaborador", bold: true })],
          }),
          new Paragraph("   -  O que foi apresentado pelos responsáveis pela sua liderança e gestão, faz sentido? Alguma dúvida ou esclarecimento necessário?"),
          new Paragraph("     R: " + respostas.colaborador_1),
          new Paragraph(""),
          new Paragraph("   - Descreva sua liderança. Ela tem sido colaborativa com sua carreira? Tem recebido o suporte necessário? Ela consegue atender suas expectativas? Alguma sugestão?"),
          new Paragraph("     R: " + respostas.colaborador_2),
          new Paragraph(""),
          new Paragraph("   - Descreva sua Gestão. Ela tem sido assertiva? Você tem se sentido ouvido e respeitado? Alguma sugestão?"),
          new Paragraph("     R: " + respostas.colaborador_3),
          new Paragraph(""),
        ],
      },
    ],
  });

  const fileName = `${nomeParticipante} - ${dataFeedback} - (Feedback 360).docx`;
  const filePath = path.join(squadDir, fileName);

  return Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(filePath, buffer);
    return filePath;
  });
}

module.exports = gerarQuestionario;
