import Agenda, { AgendaConfig } from 'agenda';

export function cronFactory(
  queueConfig: AgendaConfig,
  rootConfig: AgendaConfig,
) {
  const agendaConfig = {
    ...rootConfig,
    ...queueConfig,
  };

  delete agendaConfig.db;
  delete agendaConfig.mongo;

  return new Agenda(agendaConfig);
}
