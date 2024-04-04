import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './src/entity/ChannelChats';
import { ChannelMembers } from './src/entity/ChannelMembers';
import { Channels } from './src/entity/Channels';
import { DMs } from './src/entity/DMs';
import { Mentions } from './src/entity/Mentions';
import { Users } from './src/entity/Users';
import { WorkspaceMembers } from './src/entity/WorkspaceMembers';
import { Workspaces } from './src/entity/Workspaces';

dotenv.config();

// typeorm-extension은 app.module.ts 설정을 못 읽어온다. 따라서 dataSource.ts 파일을 생성했다.


const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT,10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'], // src/migrations 폴더에 있는 파일을 마이그레이션으로 인식한다.
  synchronize: false,
  logging: true,
});

export default dataSource;