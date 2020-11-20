import { request } from 'umi';

export async function queryPosition(platform: string) {
  return request<API.Position[]>(`/api/position/${platform}/list`);
}