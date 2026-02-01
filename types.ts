export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isPartial?: boolean;
}

export enum ConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}

export interface AudioVolumeState {
  inputVolume: number;
  outputVolume: number;
}
