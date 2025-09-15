'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Clock,
  Activity,
  TrendingUp,
  Shield,
  FileText,
  MessageSquare,
  Edit,
} from 'lucide-react';
import { users } from '@/lib/mock-data/users';
import { UserType } from '@/lib/types/users';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [user, setUser] = useState<UserType | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [isRemarkDialogOpen, setIsRemarkDialogOpen] = useState(false);
  const [currentRemark, setCurrentRemark] = useState('');
  const [userRemarks, setUserRemarks] = useState<{ text: string; timestamp: Date }[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundUser = users.find(u => u.id === id);
    setUser(foundUser || null);
    
    // Load remarks from localStorage
    const storedRemarks = localStorage.getItem(`userRemarks_${id}`);
    if (storedRemarks) {
      const parsedRemarks = JSON.parse(storedRemarks) as { text: string; timestamp: string }[];
      // Convert timestamp strings back to Date objects
      setUserRemarks(parsedRemarks.map((r) => ({
        text: r.text,
        timestamp: new Date(r.timestamp)
      })));
    }
  }, [id]);

  // Save remarks to localStorage whenever they change
  useEffect(() => {
    if (userRemarks.length > 0) {
      localStorage.setItem(`userRemarks_${id}`, JSON.stringify(userRemarks));
    }
  }, [userRemarks, id]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日 HH:mm', {
        locale: zhTW,
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">正常</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">已封鎖</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">待驗證</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleBlockToggle = () => {
    setIsBlocking(true);
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const newStatus = user.status === 'blocked' ? 'active' : 'blocked';
        setUser({ ...user, status: newStatus });
        setIsBlocking(false);
      }
    }, 1000);
  };

  const handleAddNote = () => {
    setCurrentRemark('');
    setIsRemarkDialogOpen(true);
  };

  const handleSaveRemark = () => {
    if (currentRemark.trim()) {
      setUserRemarks([...userRemarks, { text: currentRemark, timestamp: new Date() }]);
      setCurrentRemark('');
      setIsRemarkDialogOpen(false);
    }
  };

  const handleEditRemark = (index: number) => {
    setCurrentRemark(userRemarks[index].text);
    setIsRemarkDialogOpen(true);
    // Remove the old remark when editing
    const updatedRemarks = [...userRemarks];
    updatedRemarks.splice(index, 1);
    setUserRemarks(updatedRemarks);
  };

  const handleViewConversations = () => {
    router.push(`/conversations?userId=${id}`);
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Button
            onClick={() => router.push('/users')}
            variant="ghost"
            size="sm"
            className="w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
          <div className="flex justify-center items-center h-96">
            <p className="text-muted-foreground">找不到用戶資料</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Button
          onClick={() => router.push('/users')}
          variant="ghost"
          size="sm"
          className="w-fit mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold">用戶詳情查看</h1>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            {/* 基本資料 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  基本資料
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">用戶 ID</p>
                  <p className="font-medium">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">顯示名稱</p>
                  <p className="font-medium">{user.displayName || '未設定'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">註冊時間</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 使用統計 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  使用統計
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">總對話數</p>
                  <p className="font-medium text-lg">
                    {user.conversationCount} 次
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    最後活動時間
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(user.lastActive)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    平均使用頻率
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    {user.averageUsageFrequency || '計算中...'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    偏好使用時段
                  </p>
                  <p className="font-medium">
                    {user.preferredUsageTime || '分析中...'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 帳號狀態 */}
            <Card>
              <CardHeader>
                <CardTitle>帳號狀態</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      目前狀態
                    </p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(user.status)}
                    </div>
                  </div>
                  {user.status === 'blocked' && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        此用戶已被封鎖，無法使用系統功能
                      </p>
                    </div>
                  )}
                  {user.status === 'pending' && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        用戶帳號待驗證，部分功能受限
                      </p>
                    </div>
                  )}
                  {user.status === 'active' && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        帳號狀態正常，可正常使用所有功能
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 用戶操作功能 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  用戶操作功能
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleBlockToggle}
                  disabled={isBlocking}
                  variant={user.status === 'blocked' ? 'default' : 'destructive'}
                  className="w-full"
                >
                  {isBlocking ? (
                    '處理中...'
                  ) : user.status === 'blocked' ? (
                    '解封帳號'
                  ) : (
                    '封鎖帳號'
                  )}
                </Button>
                
                <Button
                  onClick={handleAddNote}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  新增備註標記
                </Button>
                
                <Button
                  onClick={handleViewConversations}
                  variant="outline"
                  className="w-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  查看該用戶對話
                </Button>

                {/* Show note about jumping to conversation management */}
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    點擊「查看該用戶對話」將跳轉到對話管理模組
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 備註標記區域 */}
          {userRemarks.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  備註標記
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userRemarks.map((remark, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">
                          {format(remark.timestamp, 'yyyy年MM月dd日 HH:mm', { locale: zhTW })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRemark(index)}
                          className="h-6 px-2"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{remark.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 備註對話框 */}
      <Dialog open={isRemarkDialogOpen} onOpenChange={setIsRemarkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新增備註標記</DialogTitle>
            <DialogDescription>
              為用戶 {user?.id} 新增備註或標記
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="remark">備註內容</Label>
              <Textarea
                id="remark"
                value={currentRemark}
                onChange={(e) => setCurrentRemark(e.target.value)}
                placeholder="輸入備註內容..."
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRemarkDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveRemark} disabled={!currentRemark.trim()}>
              儲存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
